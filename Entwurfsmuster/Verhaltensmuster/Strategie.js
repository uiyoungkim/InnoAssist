// Erzeugungsmuster -> Strategie-Muster

// Interface für die Strategien
class ResponseStrategy {
  execute(message) {
    throw new Error("You must implement execute method");
  }
}

// Konkrete Strategie für Kundendienstanfragen
class CustomerServiceStrategy extends ResponseStrategy {
  execute(message) {
    // Logik, um eine Antwort für den Kundendienst zu generieren
  }
}

// Konkrete Strategie für technische Unterstützung
class TechSupportStrategy extends ResponseStrategy {
  execute(message) {
    // Logik, um eine Antwort für technische Unterstützung zu generieren
  }
}

// Konkrete Strategie für allgemeine Anfragen
class GeneralInquiryStrategy extends ResponseStrategy {
  execute(message) {
    // Logik, um eine allgemeine Antwort zu generieren
  }
}

// Kontextklasse, die die aktuelle Strategie hält
class Chatbot {
  constructor() {
    this.responseStrategy = null;
  }

  setResponseStrategy(strategy) {
    this.responseStrategy = strategy;
  }

  generateResponse(message) {
    if (!this.responseStrategy) {
      throw new Error("No strategy set");
    }
    return this.responseStrategy.execute(message);
  }
}

// Verwendung des Strategie-Musters
const chatbot = new Chatbot();
const message = "Wie kann ich meine Bestellung zurücksenden?";

// Setze die passende Strategie basierend auf der Anfrage des Benutzers
chatbot.setResponseStrategy(new CustomerServiceStrategy());
const response = chatbot.generateResponse(message);

// Die Antwort ist eine speziell für Kundendienstanfragen generierte Nachricht
console.log(response);
