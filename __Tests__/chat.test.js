import { createMocks } from "node-mocks-http";
import handler from "@/pages/api/chat";

describe("/api/chat Integrationstest", () => {
  test("POST-Anfrage sendet eine echte Anfrage und vergleicht mit tatsächlicher Antwort", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        model: "gpt-4-turbo-preview",
        messages: [{ role: "user", content: "11*11" }],
        temperature: 0.7,
      },
    });

    // Händler Aufrufen der echte Anfrage schickt
    await handler(req, res);

    // Verarbeite und überprüfe die tatsächliche Antwort
    const data = JSON.parse(res._getData());

    // Die Prüfung sollte sich auf den Teil der Antwort konzentrieren, der bestätigt,
    // dass die echte Anfrage erfolgreich war und die erwartete Information enthält.

    expect(data).toHaveProperty("choices");
    expect(data.choices[0].message.content).toContain("121");
    console.log(data.choices[0].message.content);
  });
});
