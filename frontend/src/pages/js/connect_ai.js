// ./js/connect_ai.js

let turnIndex = 0;
const debateTurns = []; // { side: "A"|"B", text: string, ts: number }

export function wireJudgeButton() {
    // Required DOM nodes
    const argumentBox = document.getElementById("argumentInput");
    const debateLog = document.getElementById("debateLog");
    const out = document.getElementById("out");

    // Buttons
    const submitAllBtn = document.getElementById("submitArgumentButton");
    const judgeDebateBtn = document.getElementById("judgeDebateButton");

    if (!argumentBox || !debateLog || !out || !submitAllBtn || !judgeDebateBtn) {
        console.error("Missing DOM elements. Need: argumentInput, debateLog, out, submitAllArgumentsButton, judgeDebateButton");
        return;
    }

    // If out is a textarea, use .value (not textContent)
    function setOut(text) {
        if ("value" in out) out.value = text;
        else out.textContent = text;
    }

    function appendToDebateLog(text, side) {
        const wrapper = document.createElement("div");
        wrapper.className = `log-message user side-${side}`; // side-A / side-B hooks if you want CSS later

        const content = document.createElement("div");
        content.className = "message-content";
        content.textContent = `Side ${side}: ${text}`;

        wrapper.appendChild(content);
        debateLog.appendChild(wrapper);
        debateLog.scrollTop = debateLog.scrollHeight;
    }

    function compileSides() {
        const sideA = debateTurns
            .filter(t => t.side === "A")
            .map((t, i) => `A${i + 1}. ${t.text}`)
            .join("\n\n");

        const sideB = debateTurns
            .filter(t => t.side === "B")
            .map((t, i) => `B${i + 1}. ${t.text}`)
            .join("\n\n");

        return { sideA, sideB };
    }

    // ---- Pass & play submit (alternating sides) ----
    submitAllBtn.onclick = () => {
        const text = argumentBox.value.trim();
        if (!text) return;

        const side = (turnIndex % 2 === 0) ? "A" : "B";

        debateTurns.push({ side, text, ts: Date.now() });
        appendToDebateLog(text, side);

        turnIndex += 1;
        argumentBox.value = "";
        setOut(""); // optional: clear output after each entry
    };

    // ---- Judge at end: compile A vs B and call AI ----
    judgeDebateBtn.onclick = async () => {
        if (debateTurns.length === 0) {
            setOut("No arguments submitted yet.");
            return;
        }

        const { sideA, sideB } = compileSides();

        setOut("…judging debate");

        const prompt =
            `You are an argument quality judge.

Topic: is showering while brushing your teeth weird

Side A arguments:
${sideA || "(none)"}

Side B arguments:
${sideB || "(none)"}

Task:
1) Decide which side has higher overall argument quality and logical connection to the prompt.
2. Side A should support the prompt
3. Side B should be against the prompt
2) Give a brief justification.
3) Output a final line exactly as: Winner: A OR Winner: B`;

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: "argquality:latest",
                    stream: false,
                    messages: [{ role: "user", content: prompt }],
                }),
            });

            if (!res.ok) {
                setOut(`Backend error ${res.status}: ${await res.text()}`);
                return;
            }

            const j = await res.json();
            const raw = j?.message?.content ?? JSON.stringify(j, null, 2);

            // strip any </think> artifacts
            const cleaned = String(raw).split("</think>").pop().trim();
            setOut(cleaned);
        } catch (e) {
            setOut(`Network error: ${String(e)}`);
        }
    };

    // Optional: show initial info
    console.log("connect_ai wired: submitAllArguments + judgeDebate");
}
