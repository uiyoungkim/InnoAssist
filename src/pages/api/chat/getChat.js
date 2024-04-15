import knex from "knex";
import knexConfig from "../../../../knexfile";
import { extractUserId } from "@/helper/auth";

const db = knex(knexConfig.development);
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ message: "Method not allowed - Should be GET" });
  }

  try {
    const userId = extractUserId(req);

    // Abrufen aller Chat-Verläufe für den Benutzer
    const chatLogs = await db("ChatLog")
      .where("UserID", userId)
      .orderBy("createdAt", "desc");

    if (!chatLogs || chatLogs.length === 0) {
      return res.status(404).json({ message: "couldn't find any ChatLog" });
    }

    // Umwandeln der chatData von String zu Objekt, falls notwendig
    const chatsData = chatLogs.map((chatLog) => ({
      ...chatLog,
      chatData:
        typeof chatLog.chatData === "string"
          ? JSON.parse(chatLog.chatData)
          : chatLog.chatData,
    }));

    res.status(200).json(chatsData);
  } catch (error) {
    console.error("Something went wrong by finding Chat", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
