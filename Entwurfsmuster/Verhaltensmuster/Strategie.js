// --> Entwurfsmuster - Verhaltensmuster - Strategie

// Strategie-Interface
class ResponseStrategy {
  execute(prompt) {
    // Diese Methode muss in abgeleiteten Klassen implementiert werden
    throw new Error("You must implement execute method");
  }
}

// Konkrete Strategien
class ImageResponseStrategy extends ResponseStrategy {
  execute(prompt) {
    // Logik zum Generieren eines Bildes
  }
}

class AudioResponseStrategy extends ResponseStrategy {
  execute(prompt) {
    // Logik zum Generieren einer Audio-Datei
  }
}

class CodeResponseStrategy extends ResponseStrategy {
  execute(prompt) {
    // Logik zum Generieren von Code
  }
}

class TextResponseStrategy extends ResponseStrategy {
  execute(prompt) {
    // Logik zum Generieren von Text
  }
}

// Kontext
class Chatbot {
  setStrategy(strategy) {
    this.strategy = strategy; // Setzt die zu verwendende Strategie
  }

  handlePrompt(prompt) {
    if (!this.strategy) {
      throw new Error("No strategy set"); // Fehler werfen, falls keine Strategie gesetzt wurde
    }
    return this.strategy.execute(prompt); // Führt die ausgewählte Strategie mit dem gegebenen Prompt aus
  }
}

// Client
const chatbot = new Chatbot();
const prompt = getUserInput(); // Simuliert die Eingabe des Benutzers

// Entscheide, welche Strategie basierend auf dem Prompt gesetzt werden soll
if (prompt.includes("generiere Bild")) {
  chatbot.setStrategy(new ImageResponseStrategy());
} else if (prompt.includes("generiere Code")) {
  chatbot.setStrategy(new CodeResponseStrategy());
} else if (prompt.includes("generiere Audio")) {
  chatbot.setStrategy(new AudioResponseStrategy());
} else {
  // Standardmäßig wird die TextResponseStrategy verwendet
  chatbot.setStrategy(new TextResponseStrategy());
}

// Führe die ausgewählte Strategie aus
const response = chatbot.handlePrompt(prompt);
console.log(response); // Zeigt die Antwort für den Benutzer an
