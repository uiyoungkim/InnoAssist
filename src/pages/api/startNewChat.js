import knex from "knex";
import knexConfig from "../../../knexfile";
import { extractUserId } from "@/helper/auth";

const db = knex(knexConfig.development);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ message: "Method not allowed - Should be Post" });
  }

  try {
    const userId = extractUserId(req);
    const [session] = await db("ChatSession").insert({
      UserID: userId,
      StartTimestamp: new Date(),
    });

    res.status(200).json({ sessionId: session });
    console.log("Neue ChatSession gestartet:", session);
  } catch (error) {
    console.error("Fehler beim Starten einer neuen ChatSession:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

// Use this endpoint to start a new chat session. The endpoint will return the ID of the new chat session
// Session Id soll dann in frontend gespeichert werden
