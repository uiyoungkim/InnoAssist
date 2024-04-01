import knex from "knex";
import knexConfig from "../../../../knexfile";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const db = knex(knexConfig.development);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    try {
      const existingUser = await db
        .select("*")
        .from("user")
        .where("Email", email)
        .first();

      if (!existingUser) {
        return res.status(400).json({ error: "Benutzer existiert nicht" });
      }

      console.log(user.PasswordHash);
      console.log(password);
      const comparePassword = await argon2.verify(user.PasswordHash, password); //-> dann das Passwort vergleichen

      if (comparePassword) {
        //-> wenn das Passwort auch stimmt, dann Token erstellen

        const tocken = jwt.sign(
          { userid: user.userid, email: user.email },
          process.env.SECRET_KEY
        );

        console.log(tocken);
        res.cookie("jwt", tocken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000, // ein Tag
        });
        res.status(201).json({ message: "Login erfolgreich." });
      } else {
        res.status(400).json({ message: "Falsches Passwort." });
      }
    } catch (error) {
      console.error("Fehler beim Einloggen:", error);
      res.status(500).json({ message: "Serverfehler beim Einloggen." });
    }
  }
}
