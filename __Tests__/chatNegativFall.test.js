import handler from "@/pages/api/chat";
import { createMocks } from "node-mocks-http";

describe("POST /api/chat", () => {
  test("should respond with 500 status code and error message when not authenticated", async () => {
    // Simuliere eine POST-Anfrage der nicht funktionieren soll
    const { req, res } = createMocks({
      method: "POST",
      headers: {
        cookie: "", // Kein Authentifizierungs-Token vorhanden
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual({
      message: "Something went wrong",
    });
  });

  test("should respond with 405 status code for non-POST requests", async () => {
    // Simuliere eine GET-Anfrage, was nicht erlaubt sein sollte
    const { req, res } = createMocks({
      method: "GET",
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
