// pages/api/users/index.js

import knex from "knex";
import knexConfig from "../../../../knexfile";
import argon2 from "argon2";

const db = knex(knexConfig.development);

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const data = await db.select("*").from("user");
      res.status(200).json(data);
    } catch (error) {
      console.error("Datenbankabfrage Fehler:", error);
      res.status(500).json({ error: "Interner Serverfehler" });
    }
  } else if (req.method === "POST") {
    const { email, username, password } = req.body;
    try {
      const existingUser = await db
        .select("*")
        .from("user")
        .where("Email", email)
        .orWhere("Username", username)
        .first();

      if (existingUser) {
        return res.status(400).json({ error: "Benutzer existiert bereits" });
      }

      const hashedPassword = await argon2.hash(password, {
        type: argon2.argon2id,
      });

      const newUser = await db("user").insert({
        Email: email,
        Username: username,
        PasswordHash: hashedPassword,
      });

      if (newUser) {
        return res
          .status(201)
          .json({ message: "Neuer Benutzer erfolgreich hinzugefügt." });
      }
    } catch (error) {
      console.error("Fehler beim Hinzufügen des Benutzers:", error);
      return res
        .status(500)
        .json({ message: "Serverfehler beim Hinzufügen des Benutzers." });
    }
  } else {
    // Method not supported
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
