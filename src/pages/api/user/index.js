import knex from "knex";
import knexConfig from "../../../../knexfile";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { extractUserId } from "@/helper/auth";

const db = knex(knexConfig.development);

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const userId = extractUserId(req);
      const user = await db("user").where("UserID", userId).first();
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Sende den Benutzernamen als Antwort
      res.status(200).json({ username: user.Username });
    } else if (req.method === "POST") {
      const { email, password, username } = req.body;

      if (
        "email" in req.body &&
        "password" in req.body &&
        !("username" in req.body)
      ) {
        // Login Logik
        const user = await db("user").where("Email", email).first();
        if (!user) return res.status(404).json({ error: "User not found" });

        const passwordMatch = await argon2.verify(user.PasswordHash, password);
        if (!passwordMatch)
          return res.status(401).json({ error: "Wrong password" });

        const token = jwt.sign(
          { userId: user.UserID, email: user.Email },
          process.env.JWT_SECRET,
          { expiresIn: "2000h" }
        );

        res.setHeader(
          "Set-Cookie",
          serialize("auth", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            path: "/",
            maxAge: 7200 * 1000,
          })
        );

        res.status(200).json({ message: "Login Sucessful" });
      } else if (
        "email" in req.body &&
        "password" in req.body &&
        "username" in req.body
      ) {
        // Registrierungslogik
        const existingUser = await db("user").where("Email", email).first();
        if (existingUser) {
          return res.status(400).json({ error: "Already Exisiting User" });
        }

        const hashedPassword = await argon2.hash(password);
        await db("user").insert({
          Email: email,
          Username: username,
          PasswordHash: hashedPassword,
        });

        res.status(201).json({ message: "User registered successfully!" });
      } else if (req.body.action === "logout") {
        // Logout-Logik
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

        res.status(200).json({ message: "Sucessfully Logged Out" });
      } else {
        return res.status(400).json({ error: "Not Valid Action" });
      }
    } else {
      // Methode nicht unterstützt
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Fehler:", error);
    if (
      error.message === "Not Authenticated" ||
      error.message === "Not Valid Token"
    ) {
      res.status(401).json({ error: error.message });
    } else {
      res.status(500).json({ error: "interner Serverdown" });
    }
  }
}
