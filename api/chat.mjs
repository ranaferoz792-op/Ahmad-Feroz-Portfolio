import { isSessionValid } from "./_session.mjs";
import { detectLanguage, languageInstruction } from "./_detectLanguage.mjs";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const sessionToken = req.headers["x-session-token"];
  if (!isSessionValid(sessionToken)) {
    return res.status(403).json({ error: "Session expired or not verified. Please refresh the page." });
  }

  if (!GROQ_API_KEY) {
    return res.status(500).json({ error: "Chat API is not configured on the server." });
  }

  const { system, messages } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Invalid messages." });
  }

  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  const replyLang = detectLanguage(lastUser?.content || "");
  const systemWithLang = (system || "") + languageInstruction(replyLang);

  const groqMessages = [
    { role: "system", content: systemWithLang },
    ...messages.map((m) => ({ role: m.role, content: m.content })),
  ];

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        max_tokens: 1000,
        messages: groqMessages,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || "Failed to get a response from the AI.",
      });
    }

    const reply = data.choices?.[0]?.message?.content;
    return res.status(200).json({ reply: reply || "Mujhe jawab generate karne mein masla hua, dobara try karein." });
  } catch {
    return res.status(500).json({ error: "Connection error — please try again." });
  }
}
