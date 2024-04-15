import handler from "@/pages/api/chat/start";
import { createMocks } from "node-mocks-http";

describe("POST /api/chat/start", () => {
  test("should respond with 200 status code and success message", async () => {
    const { req, res } = createMocks({
      method: "POST",
      headers: {
        cookie: "auth=" + process.env.Token,
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({
      message: "new Chat has been started successfully !",
    });
  });

  test("should respond with 500 status code and error message when not authenticated", async () => {
    const { req, res } = createMocks({
      method: "POST",
      headers: {
        cookie: "", // leere Cookie (not authenticated)
        // --> Deshalb kommt das zu Nicht Authentifiziert in console.log aber so ist ja gewollt und wird getestet
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual({
      message: "Something went wrong",
    });
  });

  test("should respond with 405 status code for non-POST requests", async () => {
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
