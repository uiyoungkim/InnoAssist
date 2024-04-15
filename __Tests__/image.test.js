import axios from "axios";
import { createMocks } from "node-mocks-http";
import handler from "@/pages/api/image";

// Mock axios
jest.mock("axios");

describe("Image Generation API", () => {
  test("returns image URL for valid POST request", async () => {
    // Simuliere eine erfolgreiche Antwort von der OpenAI API
    axios.post.mockResolvedValue({
      data: {
        data: [
          {
            url: "https://example.com/image.png",
          },
        ],
      },
    });

    const { req, res } = createMocks({
      method: "POST",
      headers: {
        cookie: "auth=" + process.env.Token,
      },
      body: {
        prompt: "generate image: a cute Cat",
      },
    });

    await handler(req, res);

    // Überprüfe, ob der Statuscode 200 ist und die erwartete Bild-URL enthält
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({
      imageUrl: "https://example.com/image.png",
    });
  });

  test("returns 500 if there is an error", async () => {
    // Simuliere einen Fehler bei der Anfrage
    axios.post.mockRejectedValue(new Error("Network error"));

    const { req, res } = createMocks({
      method: "POST",
      headers: {
        cookie: "auth=" + process.env.Token,
      },
      body: {
        prompt: "generate image: a cute Cat",
      },
    });

    await handler(req, res);

    // Überprüfe, ob der Statuscode 500 ist und die Fehlermeldung enthält
    // IN console gibt console.log Error "Netzwerkfehler" aus aber so ist ja gewollt und wird getestet
    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual({
      message: "Something went wrong",
    });
  });

  test("returns 405 for non-POST requests", async () => {
    const { req, res } = createMocks({
      method: "GET",
      headers: {
        cookie: "auth=" + process.env.Token,
      },
      body: {
        prompt: "generate image: a cute Cat",
      },
    });

    await handler(req, res);

    // Überprüfe, ob der Statuscode 405 ist und die erwartete Fehlermeldung enthält
    expect(res._getStatusCode()).toBe(405);
    expect(JSON.parse(res._getData())).toEqual({
      message: "Method Not Allowed",
    });
  });
});
