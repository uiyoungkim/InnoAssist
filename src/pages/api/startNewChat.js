// pages/api/chat/start.js

import knex from "knex";
import knexConfig from "../../../knexfile";
import { extractUserId } from "@/helper/auth";

const db = knex(knexConfig.development);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ message: "Methode nicht erlaubt - POST erforderlich" });
  }

  try {
    const userId = extractUserId(req); // UserID extrahieren

    const initialChatData = [
      {
        type: "ai", // 'ai' steht für eine Nachricht vom System/Bot
        message: "Hey, Welcome to InnoAssist! How can I help you today?",
      },
    ];
    await db("ChatLog").insert({
      UserID: userId,
      chatData: JSON.stringify(initialChatData),
      createdAt: new Date(),
    });

    res.status(200).json({ message: "Neuer Chat erfolgreich gestartet" });
  } catch (error) {
    console.error("Fehler beim Starten eines neuen Chats:", error);
    res.status(500).json({ message: "Etwas ist schief gelaufen" });
  }
}
