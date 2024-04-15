import handler from "@/pages/api/user"; // Adjust the path according to your project structure
import { createMocks } from "node-mocks-http";

describe("Authentication API Handler Tests", () => {
  // Test case for successful login
  test("should respond with 200 status code and success message for login", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: { email: "uiyoungkim2002@g.com", password: "123" },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({
      message: "Login Sucessful",
    });
  });
  // Test case for successful registration
  test("should respond with 201 status code and success message for registration", async () => {
    // Generiere eine einzigartige E-Mail und Benutzernamen basierend auf der aktuellen Zeit
    const uniqueSuffix = Date.now().toString();
    const email = `testuser${uniqueSuffix}@example.com`;
    const username = `testuser${uniqueSuffix}`;

    const { req, res } = createMocks({
      method: "POST",
      body: {
        email: email,
        password: "newpassword123",
        username: username,
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(201);
    expect(JSON.parse(res._getData())).toEqual({
      message: "User registered successfully!",
    });
  });

  // Test case for logout
  test("should respond with 200 status code and success message for logout", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: { action: "logout" },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({
      message: "Sucessfully Logged Out",
    });
  });
});
