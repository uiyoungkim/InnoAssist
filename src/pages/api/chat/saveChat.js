import knex from "knex";
import knexConfig from "../../../../knexfile";
import { extractUserId } from "@/helper/auth";

const db = knex(knexConfig.development);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ message: "Method not allowed - Should be Post" });
  }

  const { chatLog, chatName } = req.body; // Chat-Verlauf als JSON-Objekt oder Array
  // Vergesse hier nicht chatName in Frontend mitzugeben!!!

  const userId = extractUserId(req); // UserID extrahieren
  console.log(userId + " tried to write a new Message");
  console.log("Chat-Verlauf:", chatLog);

  try {
    await db("ChatLog").insert({
      UserID: userId,
      chatData: JSON.stringify(chatLog),
      chatName: chatName,
    });

    res.status(200).json({ message: "ChatLog has been saved successfully" });
  } catch (error) {
    console.error("Something went wrong  with saving the chat log: ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
