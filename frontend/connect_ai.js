export function wireJudgeButton() {
    const judge_button = document.getElementById("submitArgumentButton");
    const argument_box = document.getElementById("argumentInput");
    const out = document.getElementById("out");

    if (!judge_button || !argument_box || !out) {
        console.error("Missing DOM elements");
        return;
    }

    judge_button.onclick = async () => {
        out.value = "…thinking";
        console.log("wireJudgeButton attached");

        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "argquality:latest",
                messages: [
                    {
                        role: "system",
                        content:
                            "You are an AI grader that evaluates arguments using the ArgQuality dataset criteria on a scale of 1 to five for each category.",
                    },
                    {
                        role: "user",
                        content: argument_box.value,
                    },
                ],
            }),
        });
        console.log("got back from the ai")

        const j = await res.json();
        console.log("survived res json")

        out.value =
            j?.message?.content ?? JSON.stringify(j, null, 2);
    };
}
