from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import PeftModel
import torch, json

BASE_MODEL_ID = "deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B"
ADAPTER_DIR   = "./llama-argquality-qlora/checkpoint-1800"

device = "cuda" if torch.cuda.is_available() else "cpu"

# Load base model
base_model = AutoModelForCausalLM.from_pretrained(
    BASE_MODEL_ID,
    dtype=torch.float16,
    device_map="cuda",
)

# Load LoRA adapter on top
model = PeftModel.from_pretrained(base_model, ADAPTER_DIR).to(device)

# Load tokenizer (adapter directory usually fine)
tokenizer = AutoTokenizer.from_pretrained(ADAPTER_DIR)
if tokenizer.pad_token is None:
    tokenizer.pad_token = tokenizer.eos_token


###########################################################################################################
# Step 2: Prompt builder for A/B judging
###########################################################################################################
def build_pair_prompt(topic, argA, argB) -> str:
    return f"""You are an argument quality judge.

Topic: {topic}

Argument A:
\"\"\"{argA}\"\"\"

Argument B:
\"\"\"{argB}\"\"\"

Which argument is higher quality? Answer with a single letter: A or B.
Answer:""".strip()





def model_generate(prompt: str) -> str:
    inputs = tokenizer(prompt, return_tensors="pt").to(device)

    output = model.generate(
        **inputs,
        max_new_tokens=512,
        temperature=0.0,     # deterministic
        do_sample=False,
        pad_token_id=tokenizer.eos_token_id,
    )

    return tokenizer.decode(output[0], skip_special_tokens=True)


def rate_argument(topic, arg1, arg2):
    prompt = build_pair_prompt(topic, arg1, arg2)
    raw_output = model_generate(prompt)
    return raw_output

print(rate_argument("Should non-queer people be able to say the f-word", "The f-word has been used to cause grief and separate people. It was used to deny rights to certain groups. It's purpose was to cause pain for a group of people", "Well, actually the f word has historical origins in europe and it didn't really mean that when it was created."))