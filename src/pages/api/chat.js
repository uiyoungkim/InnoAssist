import knex from "knex";
import axios from "axios";
import knexConfig from "../../../knexfile";
import { extractUserId } from "@/helper/auth";

const db = knex(knexConfig.development);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed - Should be Post" });
  }
  const { model, messages, temperature } = req.body;

  const userMessage = messages[0].content;
  const userId = extractUserId(req);
  const sessionId = req.body.sessionId;

  try {
    const url = "https://api.openai.com/v1/chat/completions";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    };

    // Senden der Anfrage an OpenAI
    const response = await axios.post(
      url,
      { model, messages, temperature },
      { headers }
    );

    const aiReply = response.data.choices[0].message.content;

    // Speichern der Nachrichten in der Datenbank
    await db("ChatLog").insert([
      {
        UserID: userId,
        Message: userMessage,
        MessageType: "user",
        CreatedAt: new Date(),
        //  SessionID: sessionId,
      },
      {
        UserID: userId,
        Message: aiReply,
        MessageType: "AI",
        CreatedAt: new Date(),
        // SessionID: sessionId,
      },
    ]);

    res.status(200).json({ userMessage, aiReply });
  } catch (error) {
    console.error("Fehler:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
