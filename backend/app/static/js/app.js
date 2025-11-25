const out = document.getElementById('out');
const llama2prompt = document.getElementById('llama2_prompt');
const deepseekprompt = document.getElementById('deepseek_prompt');

document.getElementById('llama2_send').onclick = async () => {
    document.getElementById('llama2_out').textContent = "…thinking";
    const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model: "llama2",

            messages: [
                {
                    role: "system",
                    content: "You are an AI grader that evaluates arguments using the ArgQuality dataset criteria on a scale of 1 to five for each category."
                },
                {
                    role: "user",
                    content: llama2prompt.value
                }
            ],

        }),
    });
    const j = await res.json();
    document.getElementById('llama2_out').textContent = j?.message?.content ?? JSON.stringify(j, null, 2);
};


document.getElementById('deepseek_send').onclick = async () => {
    document.getElementById('deepseek_out').textContent = "…thinking";
    const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: deepseekprompt.value }], model: "deepseek-r1" }),
    });
    const j = await res.json();
    document.getElementById('deepseek_out').textContent = j?.message?.content ?? JSON.stringify(j, null, 2);
};






