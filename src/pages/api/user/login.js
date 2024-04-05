// pages/api/user/login.js
import knex from "knex";
import knexConfig from "../../../../knexfile";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const db = knex(knexConfig.development);

export default async function loginHandler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { email, password } = req.body;

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
      { userId: user.id, email: user.Email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // http only
    res.setHeader(
      "Set-Cookie",
      serialize("auth", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: 7200, // 2 hours
      })
    );

    return res.status(200).json({ message: "Login Successful" });
  } catch (error) {
    console.error("Login went wrong:", error);
    return res.status(500).json({ error: "servererror" });
  }
}

/* -> http://localhost:3000/api/user/login

body: 
{
    "email": "uiyoungkim2002@g.com",
    "password":"123"
}
*/
