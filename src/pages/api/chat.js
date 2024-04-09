import axios from "axios";
import knex from "knex";
import knexConfig from "../../../knexfile";

const db = knex(knexConfig.development);

import { extractUserId } from "@/helper/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed - Should be Post" });
  } else {
    try {
      const userId = extractUserId(req);
      const user = await db("user").where("UserID", userId).first();
      if (!user || user.auth !== 1) {
        return res.status(403).json({
          message: "Unauthorized access, Please Contact via Contact formular",
        });
      }
      const { body } = req;
      const url = "https://api.openai.com/v1/chat/completions";

      const headers = {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      };

      const response = await axios.post(url, body, { headers: headers });

      res.status(200).json(response.data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}
