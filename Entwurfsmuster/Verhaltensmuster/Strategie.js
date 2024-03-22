// --> Entwurfsmuster - Verhaltensmuster - Strategie

// Strategie-Interface
class ResponseStrategy {
  execute(prompt) {
    throw new Error("You must implement execute method");
  }
}

// Konkrete Strategien
class ImageResponseStrategy extends ResponseStrategy {
  execute(prompt) {
    // Logik zum Generieren eines Bildes
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
    this.strategy = strategy;
  }

  handlePrompt(prompt) {
    if (!this.strategy) {
      throw new Error("No strategy set");
    }
    return this.strategy.execute(prompt);
  }
}

// Client
const chatbot = new Chatbot();
const prompt = getUserInput();

// Entscheide, welche Strategie basierend auf dem Prompt gesetzt werden soll
if (prompt.includes("generiere Bild")) {
  chatbot.setStrategy(new ImageResponseStrategy());
} else if (prompt.includes("generiere Code")) {
  chatbot.setStrategy(new CodeResponseStrategy());
} else {
  chatbot.setStrategy(new TextResponseStrategy());
}

// Führe die ausgewählte Strategie aus
const response = chatbot.handlePrompt(prompt);
console.log(response); // Response für User
