import handler from "@/pages/api/chat/start"; // Adjust the path according to your project structure
import { createMocks } from "node-mocks-http";

describe("POST /api/chat/start", () => {
  test("should respond with 200 status code and success message", async () => {
    const { req, res } = createMocks({
      method: "POST",
      headers: {
        cookie:
          "auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImVtYWlsIjoidWl5b3VuZ2tpbTIwMDJAZy5jb20iLCJpYXQiOjE3MTI2MTkzODUsImV4cCI6MTcxMjYyNjU4NX0.w74Wf_tgbXx7nFnPGfoIuCRRFOtoTP90kI13Ofar85A",
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({
      message: "Neuer Chat erfolgreich gestartet",
    });
  });

  test("should respond with 500 status code and error message when not authenticated", async () => {
    const { req, res } = createMocks({
      method: "POST",
      headers: {
        cookie: "", // leere Cookie (not authenticated)
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual({
      message: "Etwas ist schief gelaufen",
    });
  });

  test("should respond with 405 status code for non-POST requests", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(JSON.parse(res._getData())).toEqual({
      message: "Methode nicht erlaubt - POST erforderlich",
    });
  });
});
