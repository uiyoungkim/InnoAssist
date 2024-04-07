// pages/api/user/index.js

import knex from "knex";
import knexConfig from "../../../../knexfile";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const db = knex(knexConfig.development);

export default async function handler(req, res) {
if (req.method === "POST") {
    const { email, password, username } = req.body;

    // Überprüfung, ob es sich um eine Login-Anfrage handelt
    if (
      "email" in req.body &&
      "password" in req.body &&
      !("username" in req.body)
    ) {
      /*
    --> Login mit folgendem JSON-Body:
      {   
  
        "email": "uyoywo@g.com",
        "password":"123"
    }

    */
      try {
        const user = await db("user").where("Email", email).first();
        if (!user) {
          return res.status(404).json({ error: "Benutzer nicht gefunden." });
        }

        const passwordMatch = await argon2.verify(user.PasswordHash, password);
        if (!passwordMatch) {
          return res.status(401).json({ error: "Ungültiges Passwort." });
        }

        const token = jwt.sign(
          { userId: user.UserID, email: user.Email },
          process.env.JWT_SECRET,
          { expiresIn: "2h" }
        );

        res.setHeader(
          "Set-Cookie",
          serialize("auth", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/",
            maxAge: 7200,
          })
        );

        res.status(200).json({ message: "Login erfolgreich." });
      } catch (error) {
        console.error("Login fehlgeschlagen:", error);
        res.status(500).json({ error: "Fehler beim Login." });
      }
    } else if (
      "email" in req.body &&
      "password" in req.body &&
      "username" in req.body
    ) {
      /*
      -->  Registrierungslogik mit folgendem JSON-Body:
      {   
    "username": "bubu",
    "email": "uyoywo@g.com",
    "password":"123"
    }

      */
      try {
        const existingUser = await db("user")
          .where("Email", email)
          .first();
        if (existingUser) {
          return res.status(400).json({ error: "Benutzer existiert bereits." });
        }

        const hashedPassword = await argon2.hash(password);
        await db("user").insert({
          Email: email,
          Username: username,
          PasswordHash: hashedPassword,
        });

        res.status(201).json({ message: "Benutzer erfolgreich registriert." });
      } catch (error) {
        console.error("Registrierung fehlgeschlagen:", error);
        res
          .status(500)
          .json({ error: "Fehler beim Registrieren des Benutzers." });
      }
    } else if (req.method === "POST" && req.body.action === "logout") {
      // Logout-Logik
      // request body: hardcorded : { action: "logout" }
      res.setHeader(
        "Set-Cookie",
        serialize("auth", "", {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          path: "/",
          maxAge: 0,
        })
      );

      res.status(200).json({ message: "Logout erfolgreich." });
    } else {
      // Ungültige Anfrage
      res.status(400).json({ error: "Ungültige Anfrage." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
