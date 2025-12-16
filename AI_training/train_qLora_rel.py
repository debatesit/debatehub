###########################################################################################################
# Imports
###########################################################################################################
from datasets import load_dataset, Dataset
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    TrainingArguments,
    Trainer,
    BitsAndBytesConfig,
    default_data_collator,
)
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training
import torch
import numpy as np
from collections import defaultdict
import random

print("CUDA available:", torch.cuda.is_available())
print("CUDA device count:", torch.cuda.device_count())
print("CUDA device name:", torch.cuda.get_device_name(0) if torch.cuda.is_available() else "None")

###########################################################################################################
# Config
###########################################################################################################
BASE_MODEL_ID = "deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B"
# BASE_MODEL_ID = "meta-llama/Llama-3.1-8B-Instruct"
OUTPUT_DIR = "./llama-argquality-qlora"
GGUF_OUTPUT_DIR = "./llama-argquality-gguf"

MAX_SEQ_LEN = 512 # denotes maximum number of tokens used in response
BATCH_SIZE = 1
LR = 2e-4
NUM_EPOCHS = 1
USE_QLORA = True

SCORE_KEY = "WA"
MIN_MARGIN = 0.15
PAIRS_PER_GROUP = 40
GROUP_BY_STANCE = True
SEED = 0

###########################################################################################################
# Load Dataset
###########################################################################################################
ds_arg_quality = load_dataset("ibm-research/argument_quality_ranking_30k", "argument_quality_ranking")

train_ds_raw = ds_arg_quality["train"]
val_ds_raw   = ds_arg_quality["validation"]

# sanity check columns
required_cols = {"topic", "argument", SCORE_KEY}
missing = required_cols - set(train_ds_raw.column_names)
if missing:
    raise ValueError(f"Missing required columns in dataset: {missing}. Available: {train_ds_raw.column_names}")

# stance might be absent in some variants; we handle it gracefully
has_stance = "stance" in train_ds_raw.column_names


#######################################################################################################
# Step 1: Build pairwise rows (new "table")
###########################################################################################################
def make_pairwise_rows(
    hf_dataset,
    score_key="WA",
    min_margin=0.15,
    pairs_per_group=40,
    group_by_stance=True,
    seed=0,
):
    rng = random.Random(seed)
    buckets = defaultdict(list)

    # bucket examples
    for ex in hf_dataset:
        topic = ex["topic"]
        stance = "PRO (supports the topic)" if ex["stance_WA"] == 1 else "CON (opposes the topic)"
        key = (topic, stance) if group_by_stance else (topic,)
        # keep only necessary fields to reduce memory
        buckets[key].append({
            "topic": topic,
            "stance": stance,
            "argument": ex["argument"],
            "score": float(ex[score_key]),
        })

    pair_rows = []
    for key, items in buckets.items():
        if len(items) < 2:
            continue

        # sample up to pairs_per_group pairs
        # (skip if we can't find enough non-tie pairs)
        attempts = 0
        made = 0
        max_attempts = pairs_per_group * 10  # avoid infinite loops on tight buckets

        while made < pairs_per_group and attempts < max_attempts:
            attempts += 1
            a, b = rng.sample(items, 2)
            sa, sb = a["score"], b["score"]
            if abs(sa - sb) < min_margin:
                continue

            # winner is the higher score
            if sa > sb:
                argA, argB = a["argument"], b["argument"]
                label = "A"
            else:
                argA, argB = a["argument"], b["argument"]
                label = "B"

            pair_rows.append({
                "topic": a["topic"],
                "stance": a["stance"],
                "argA": argA,
                "argB": argB,
                "label": label,
                "scoreA": sa,
                "scoreB": sb,
            })
            made += 1

    return pair_rows

train_pairs_list = make_pairwise_rows(
    train_ds_raw,
    score_key=SCORE_KEY,
    min_margin=MIN_MARGIN,
    pairs_per_group=PAIRS_PER_GROUP,
    group_by_stance=GROUP_BY_STANCE and has_stance,
    seed=SEED,
)

val_pairs_list = make_pairwise_rows(
    val_ds_raw,
    score_key=SCORE_KEY,
    min_margin=MIN_MARGIN,
    pairs_per_group=max(10, PAIRS_PER_GROUP // 2),
    group_by_stance=GROUP_BY_STANCE and has_stance,
    seed=SEED + 1,
)

print(f"Built pairwise train rows: {len(train_pairs_list)}")
print(f"Built pairwise val rows:   {len(val_pairs_list)}")

train_pairs = Dataset.from_list(train_pairs_list)
val_pairs   = Dataset.from_list(val_pairs_list)



###########################################################################################################
# Step 2: Prompt builder for A/B judging
###########################################################################################################
def build_pair_prompt(topic, stance, argA, argB) -> str:
    stance_str = stance if stance != "" else "UNKNOWN"
    return f"""You are an argument quality judge.

Topic: {topic}
Stance: {stance_str}

Argument A:
\"\"\"{argA}\"\"\"

Argument B:
\"\"\"{argB}\"\"\"

Which argument is higher quality? Answer with a single letter: A or B.
Answer:""".strip()




###########################################################################################################
# Tokenizer + tokenization map
###########################################################################################################
tokenizer = AutoTokenizer.from_pretrained(BASE_MODEL_ID)
if tokenizer.pad_token is None:
    tokenizer.pad_token = tokenizer.eos_token
def tokenize_pairwise(example):
    prompt = build_pair_prompt(example["topic"], example["stance"], example["argA"], example["argB"])
    label_text = example["label"]  # "A" or "B"

    # tokenize separately (NO padding here)
    prompt_tok = tokenizer(prompt, add_special_tokens=True, truncation=True, max_length=MAX_SEQ_LEN)
    label_tok  = tokenizer(" " + label_text, add_special_tokens=False)  # leading space helps

    input_ids = prompt_tok["input_ids"] + label_tok["input_ids"]
    attention_mask = [1] * len(input_ids)

    # truncate if needed
    input_ids = input_ids[:MAX_SEQ_LEN]
    attention_mask = attention_mask[:MAX_SEQ_LEN]

    # labels: mask prompt, supervise label tokens
    labels = [-100] * len(prompt_tok["input_ids"]) + label_tok["input_ids"]
    labels = labels[:MAX_SEQ_LEN]

    # pad to MAX_SEQ_LEN (right padding)
    pad_id = tokenizer.pad_token_id
    while len(input_ids) < MAX_SEQ_LEN:
        input_ids.append(pad_id)
        attention_mask.append(0)
        labels.append(-100)   # NEVER supervise padding

    return {
        "input_ids": input_ids,
        "attention_mask": attention_mask,
        "labels": labels,
    }

tokenized_train = train_pairs.map(tokenize_pairwise, remove_columns=train_pairs.column_names)
tokenized_val   = val_pairs.map(tokenize_pairwise, remove_columns=val_pairs.column_names)

labels = tokenized_train[0]["labels"]
input_ids = tokenized_train[0]["input_ids"]

supervised = [(i, tokenizer.decode([input_ids[i]]))
              for i, x in enumerate(labels) if x != -100]

print("Supervised tokens:", supervised)
print("Count:", len(supervised))

###########################################################################################################
# Model: QLoRA load
###########################################################################################################
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_use_double_quant=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.bfloat16,
)

model = AutoModelForCausalLM.from_pretrained(
    BASE_MODEL_ID,
    quantization_config=bnb_config,
    device_map="auto",
)

if USE_QLORA:
    model = prepare_model_for_kbit_training(model)
    lora_config = LoraConfig(
        r=16,
        lora_alpha=32,
        lora_dropout=0.05,
        bias="none",
        task_type="CAUSAL_LM",
        target_modules=["q_proj", "v_proj"],  # adjust if your model uses different names
    )
    model = get_peft_model(model, lora_config)

###########################################################################################################
# TrainingArguments + Trainer
###########################################################################################################
training_args = TrainingArguments(
    output_dir=OUTPUT_DIR,
    per_device_train_batch_size=BATCH_SIZE,
    per_device_eval_batch_size=BATCH_SIZE,
    num_train_epochs=NUM_EPOCHS,
    learning_rate=LR,
    logging_steps=10,
    eval_strategy="no",
    save_strategy="steps",
    save_steps=200,
    save_total_limit=2,
    fp16=True,
    gradient_accumulation_steps=1,
    report_to="none",
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_train,
    eval_dataset=tokenized_val,
    data_collator=default_data_collator,
    tokenizer=tokenizer,
)

###########################################################################################################
# Train
###########################################################################################################
trainer.train()

###########################################################################################################
# Save
###########################################################################################################
from peft import PeftModel

MERGED_DIR = "./merged-hf"

if USE_QLORA:
    peft_output_dir = OUTPUT_DIR + "/adapter"
    model.save_pretrained(peft_output_dir)
    tokenizer.save_pretrained(peft_output_dir)

    # reload base in fp16 for a real merge
    base_model = AutoModelForCausalLM.from_pretrained(
        BASE_MODEL_ID,
        torch_dtype=torch.float16,
        device_map="cpu",   # safer for merging; can use "auto" if you have VRAM
    )

    merged = PeftModel.from_pretrained(base_model, peft_output_dir)
    merged = merged.merge_and_unload()   # <-- this is the actual merge

    merged.save_pretrained(MERGED_DIR, safe_serialization=True)
    tokenizer.save_pretrained(MERGED_DIR)
