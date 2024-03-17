// --> Erzeugungsmuster - Singleton

var OpenAIAPIAdapter = (function () {
  var instance;

  // singleton function
  function OpenAIAPIAdapter() {
    if (!instance) {
      instance = this;
      this.textEndpoint = "https://api.openai.com/v1/chat/completions";
      this.imageEndpoint = "https://api.openai.com/v1/images/generations";
      this.apiKey = "XY";
    }
    return instance;
  }

  OpenAIAPIAdapter.prototype.fetchTextResponse = function (prompt) {
    // to fetch text response from the API
    console.log("Fetching text response for:", prompt);
  };

  OpenAIAPIAdapter.prototype.fetchImageResponse = function (prompt) {
    // to fetch image response from the API
    console.log("Fetching image response for:", prompt);
  };

  OpenAIAPIAdapter.getInstance = function () {
    if (!instance) {
      instance = new OpenAIAPIAdapter();
    }
    return instance;
  };

  return OpenAIAPIAdapter;
})();

// Usage
var apiAdapter1 = OpenAIAPIAdapter.getInstance();
var apiAdapter2 = OpenAIAPIAdapter.getInstance();

console.log(apiAdapter1 === apiAdapter2); // Output: true

apiAdapter1.fetchTextResponse("prompt for text");
apiAdapter2.fetchImageResponse("prompt for image");
