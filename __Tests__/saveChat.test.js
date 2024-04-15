import handler from "@/pages/api/chat/saveChat";
import { createMocks } from "node-mocks-http";

describe("POST /api/chat/saveChat", () => {
  test("should reply with 200 statuscode and message", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        chatLog: [
          {
            type: "ai",
            message: "Hey, Welcome to InnoAssist! How can I help you today?",
          },
        ],
        chatName: "TestChatName",
      },
      // Annahme: extractUserId liest die UserID aus den Cookies
      headers: {
        cookie: "auth=" + process.env.Token,
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({
      message: "ChatLog has been saved successfully",
    });
  });

  test("should reply with statuscode 500", async () => {
    const { req, res } = createMocks({
      method: "POST",

      headers: {
        cookie: "auth=" + process.env.Token,
      },
    });

    await handler(req, res);

    // Die erwartete Antwort könnte variieren, je nachdem wie deine API-Fehler bei fehlender Authentifizierung handhabt.
    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual({
      message: "Something went wrong",
    });
  });

  test("should reply with statuscode 405", async () => {
    const { req, res } = createMocks({
      method: "GET", // Verwendung einer nicht unterstützten Methode
      body: {
        chatLog: [
          {
            type: "ai",
            message: "Hey, Welcome to InnoAssist! How can I help you today?",
          },
        ],
        chatName: "TestChatName",
      },
      headers: {
        cookie: "auth=" + process.env.Token,
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(JSON.parse(res._getData())).toEqual({
      message: "Method not allowed - Should be Post",
    });
  });
});
