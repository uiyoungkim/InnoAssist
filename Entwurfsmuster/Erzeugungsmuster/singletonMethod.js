// --> Erzeugungsmuster - Singleton

// um eine Singleton-Instanz von OpenAIAPIAdapter zu erstellen
var OpenAIAPIAdapter = (function () {
  var instance; // Hält die Singleton-Instanz von OpenAIAPIAdapter

  // singleton function
  function OpenAIAPIAdapter() {
    if (!instance) {
      instance = this; // Wenn keine Instanz existiert, erstelle eine neue
      this.textEndpoint = "https://api.openai.com/v1/chat/completions";
      this.imageEndpoint = "https://api.openai.com/v1/images/generations";
      this.apiKey = "XY"; //API-Key
    }
    return instance; // Gibt die vorhandene Instanz zurück, falls sie erneut aufgerufen wird
  }

  // Methode, um Textantworten von der API abzurufen
  OpenAIAPIAdapter.prototype.fetchTextResponse = function (prompt) {
    console.log("Fetching text response for:", prompt);
    // Die Logik zum Abrufen der Textantwort gehört hierher
  };

  // Methode, um Bildantworten von der API abzurufen
  OpenAIAPIAdapter.prototype.fetchImageResponse = function (prompt) {
    console.log("Fetching image response for:", prompt);
    // Die Logik zum Abrufen der Bildantwort gehört hierher
  };

  // um die Instanz des OpenAIAPIAdapter zu erhalten
  OpenAIAPIAdapter.getInstance = function () {
    if (!instance) {
      instance = new OpenAIAPIAdapter(); // Erstelle eine neue Instanz, falls keine existiert
    }
    return instance; // Gibt die vorhandene Instanz zurück
  };

  return OpenAIAPIAdapter; // Gibt die Konstruktorfunktion zurück
})();

// Beispiel für die Verwendung
var apiAdapter1 = OpenAIAPIAdapter.getInstance(); // Holt die Singleton-Instanz
var apiAdapter2 = OpenAIAPIAdapter.getInstance(); // Holt dieselbe Singleton-Instanz

console.log(apiAdapter1 === apiAdapter2); // Ausgabe: true, beweist, dass beide Variablen dieselbe Instanz halten

// Methoden auf der Singleton-Instanz aufrufen
apiAdapter1.fetchTextResponse("prompt for text");
apiAdapter2.fetchImageResponse("prompt for image");
