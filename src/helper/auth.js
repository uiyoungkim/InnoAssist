import jwt from "jsonwebtoken";
import cookie from "cookie";

export function extractUserId(req) {
  const { cookie: cookieHeader } = req.headers;
  const cookies = cookie.parse(cookieHeader || "");
  const token = cookies.auth;

  if (!token) {
    throw new Error("Not Authenticated");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Not Valid Token");
  }

  return decoded.userId;
}
