// pages/api/data.js
import knex from "knex";
import knexConfig from "../../../knexfile";

const db = knex(knexConfig.development);

export default async function handler(req, res) {
  try {
    const data = await db.select("*").from("user");
    res.status(200).json(data);
  } catch (error) {
    console.error("Datenbankabfrage Fehler:", error);
    res.status(500).json({ error: "Interner Serverfehler" });
  }
}
