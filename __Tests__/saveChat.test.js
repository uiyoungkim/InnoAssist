import handler from "./handler"; // Stelle sicher, dass der Pfad korrekt ist
import { createMocks } from "node-mocks-http";
import knex from "knex";
import knexConfig from "../../../../knexfile";
import { extractUserId } from "@/helper/auth";

// Mock für knex und extractUserId
jest.mock("knex");
jest.mock("../src/helper/auth", () => ({
  extractUserId: jest.fn(() => "mockedUserId"),
}));

describe("handler function", () => {
  let dbMock;
  beforeEach(() => {
    // Mock für knex initialisieren
    dbMock = knex(knexConfig.development);
    knex.mockReturnValue(dbMock);
  });

  afterEach(() => {
    // Alle Mocks zurücksetzen
    jest.clearAllMocks();
  });

  test("should return 405 status code for non-POST method", async () => {
    const { req, res } = createMocks({ method: "GET" });

    await handler(req, res);

    expect(res.statusCode).toBe(405);
    expect(res._getJSONData()).toEqual({
      message: "Method not allowed - Should be Post",
    });
  });

  test("should insert chat log into database and return 200 status code on successful POST request", async () => {
    const chatLog = [{ message: "Hello" }, { message: "World" }];
    const chatName = "Test Chat";

    const { req, res } = createMocks({
      method: "POST",
      headers: {
        cookie:
          "auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImVtYWlsIjoidWl5b3VuZ2tpbTIwMDJAZy5jb20iLCJpYXQiOjE3MTI2NzgzMTQsImV4cCI6MTcxOTg3ODMxNH0.ZOvKEMjh-8yhBmI4-ksjCa3-hh5IwrHqC7PAGkQ3INg", // Stelle sicher, dass dies ein gültiger Token ist
      },
      body: { chatLog, chatName },
    });

    await handler(req, res);

    expect(dbMock).toHaveBeenCalledWith("ChatLog");
    expect(dbMock().insert).toHaveBeenCalledWith({
      UserID: "mockedUserId",
      chatData: JSON.stringify(chatLog),
      chatName,
    });
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({
      message: "Chat-Verlauf erfolgreich gespeichert",
    });
  });

  test("should return 500 status code and error message if database insertion fails", async () => {
    dbMock().insert.mockRejectedValueOnce(new Error("Database error"));

    const { req, res } = createMocks({
      method: "POST",
      body: { chatLog: [], chatName: "Test Chat" },
    });

    await handler(req, res);

    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toEqual({
      message: "Something went wrong",
    });
  });
});
