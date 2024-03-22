// Erzeugungsmuster -> Factory Methode

// Basisklasse für Nachrichten
class Message {
  constructor(content) {
    this.content = content; // Der Inhalt der Nachricht
  }
}

// Klasse für Benutzernachrichten, erbt von Message
class UserMessage extends Message {
  constructor(content) {
    super(content); // Aufruf des Message-Konstruktors mit Inhalt
    this.side = "right"; // Positionierung der Nachricht auf der rechten Seite
    this.color = "purple"; // Farbe für Benutzernachrichten festlegen
  }
}

// Klasse für Nachrichten von der AI, erbt von Message
class AiMessage extends Message {
  constructor(content) {
    super(content); // Aufruf des Message-Konstruktors mit Inhalt
    this.side = "left"; // Positionierung der Nachricht auf der linken Seite
    this.color = "gray"; // Farbe für AI-Nachrichten festlegen
  }
}

// Factory-Klasse zur Erstellung von Nachrichtenobjekten
class MessageFactory {
  // Statische Methode, die aufgerufen wird, um ein Nachrichtenobjekt zu erstellen
  static createMessage(type, content) {
    switch (type) {
      case "user":
        return new UserMessage(content); // Erstellt ein Objekt für Benutzernachrichten
      case "ai":
        return new AiMessage(content); // Erstellt ein Objekt für AI-Nachrichten
      default:
        throw new Error("Invalid message type"); // Fehler werfen, wenn der Typ ungültig ist
    }
  }
}
