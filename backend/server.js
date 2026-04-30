import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import OpenAI from "openai";
import { defaultPersona, personaPrompts } from "./personas.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "*";

app.use(cors({ origin: "*" }));
app.use(express.json());

const hasGroqKey = Boolean(process.env.GROQ_API_KEY);
if (!hasGroqKey) {
  console.warn("GROQ_API_KEY is missing. Add it in backend/.env");
}

const client = hasGroqKey
  ? new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1"
    })
  : null;


app.get("/", (_req, res) => {
  res.send("Backend is running");
});

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/chat", async (req, res) => {
  try {
    if (!client) {
      return res.status(500).json({
        reply: "Server is missing GROQ_API_KEY. Add it in backend/.env and restart."
      });
    }

    const { message, persona } = req.body || {};
    const selectedPersona = personaPrompts[persona] ? persona : defaultPersona;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        reply: "Please enter a valid question before sending."
      });
    }

    const response = await client.chat.completions.create({
      model: process.env.GROQ_MODEL || "llama-3.1-8b-instant",
     
      messages: [
        { role: "system", content: personaPrompts[selectedPersona] },
        { role: "user", content: message.trim() }
      ]
    });

    const reply =
      response.choices?.[0]?.message?.content?.trim() ||
      "I could not generate a response right now.";

    return res.json({ reply });
  } catch (error) {
    const status = error?.status || error?.code || 500;
    console.error("Chat API error:", error?.message || error);

    if (status === 429) {
      return res.status(429).json({
        reply: "Rate limit reached. Please wait a minute and try again."
      });
    }

    return res.status(500).json({
      reply: "The chatbot is temporarily unavailable. Please try again in a few seconds."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
