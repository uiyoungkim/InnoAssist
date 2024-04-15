import axios from "axios";
import { useState } from "react";
import TypingAnimation from "@/components/TypingAnimation";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [inputValue, setInputValue] = useState(""); // User input
  const [chatLog, setChatLog] = useState([]); // Complete Chat log, updated with each message
  const [isLoading, setIsLoading] = useState(false);

  let newChatLog = [];

  const handleSaveChat = async () => {
    try {
      await axios.post("/api/chat/saveChat", { chatLog });
      console.log("Chat-Verlauf gespeichert.");
    } catch (error) {
      console.error("Fehler beim Speichern des Chat-Verlaufs:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // check if user wants to generate an image
    if (
      inputValue.toLowerCase().includes("generate image") ||
      inputValue.toLowerCase().includes("generate an image")
    ) {
      newChatLog = [
        // Add user message to chat log
        ...chatLog,
        { type: "user", message: inputValue },
      ];
      setChatLog(newChatLog); // Update chat log
      generateImage(inputValue, newChatLog); // Generate image
      setInputValue(""); // Clear input field
    }

    // test case without sending an API request
    else if (inputValue.toLowerCase() === "test") {
      newChatLog = [
        // Add user message and test response to chat log
        ...chatLog,
        { type: "user", message: inputValue },
        { type: "ai", message: "Test response" },
      ];
      setChatLog(newChatLog); // Update chat log
      setInputValue(""); // Clear input field
    }

    // normal chat message
    else {
      newChatLog = [
        // Add user message to chat log
        ...chatLog,
        { type: "user", message: inputValue },
      ];
      setChatLog(newChatLog); // Update chat log
      sendMessage(inputValue, newChatLog); // Call sendMessage function with user input and updated chat log
      setInputValue(""); // Clear input field
    }
  };

  const resetChat = () => {
    // Reset chat log and input field
    setInputValue("");
    setChatLog([]);
  };

  // Client Side
  const sendMessage = (message, iChatLog) => {
    const url = "/api/chat";
    const data = {
      model: "gpt-4-turbo-preview",
      messages: [{ role: "user", content: message }],
      temperature: 0.7,
    };

    setIsLoading(true); // Start loading animation

    axios // Send POST request to /api/chat with user message
      .post(url, data)
      .then((response) => {
        const aiResponse = {
          type: "ai",
          message: response.data.choices[0].message.content, // Get AI response from response object
        };
        newChatLog = [...iChatLog, aiResponse]; // Append AI response to Chat Log
        setChatLog(newChatLog); // Update chat log
        setIsLoading(false); // End loading animation
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response) {
          const statusCode = error.response.status;
          if (statusCode === 500) {
            alert("Please log in before trying to chat with InnoAssist.");
          } else if (statusCode === 403) {
            // Handle 403 Forbidden Error
            alert("It seems you havent unlocked your account yet. Please contact us using our Contact Form.");
          }
        } else if (error.request) {
          console.error("No response received:", error.request);
          alert("No response received. Please check your internet connection.");
        } else {
          console.error("Error:", error.message);
          alert("An error occurred. Please try again later.");
        }
      });
      
  };

  // For img
  const generateImage = (prompt, iChatLog) => {
    setIsLoading(true); // Start loading animation

    axios // Send POST request to /api/image with user message
      .post("/api/image", { prompt })
      .then((response) => {
        const imageUrl = response.data.imageUrl; // Get image URL from response object
        newChatLog = [
          // Add the image to the chat log as a response from AI
          ...iChatLog,
          { type: "image", url: imageUrl, message: "" },
        ];
        setChatLog(newChatLog); // Update chat log
        setIsLoading(false); // End loading animation
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response) {
          const statusCode = error.response.status;
          if (statusCode === 500) {
            alert("Please log in before trying to chat with InnoAssist.");
          } else if (statusCode === 403) {
            // Handle 403 Forbidden Error
            alert("It seems you havent unlocked your account yet. Please contact us using our Contact Form.");
          }
        } else if (error.request) {
          console.error("No response received:", error.request);
          alert("No response received. Please check your internet connection.");
        } else {
          console.error("Error:", error.message);
          alert("An error occurred. Please try again later.");
        }
      });
  };

  return (
    <main>
      <Navbar/>
      <div className="flex flex-col bg-gray-900 min-h-screen">
        <div className="flex-grow p-6 ">
          <div className="flex flex-col space-y-4 mb-20">
            {chatLog.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.type === "image" ? (
                  <img
                    src={message.url}
                    className="max-w-xs rounded-lg"
                    alt="Generated"
                  />
                ) : (
                  <div
                    className={`${
                      message.type === "user" ? "bg-purple-500" : "bg-gray-800"
                    } rounded-lg p-4 text-white w-full md:max-w-lg`}
                  >
                    {message.message}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 rounded-lg p-4 text-white w-full md:max-w-sm">
                  <TypingAnimation />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 left-0 w-full p-6 bg-gray-800 border-t border-gray-700 flex items-center"
      >
        <input
          type="text"
          className="flex-grow px-4 py-2 bg-gray-900 text-white placeholder-gray-400 focus:outline-none"
          placeholder="Type a message"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          type="submit"
          className="bg-purple-500 rounded-lg px-4 py-2 text-white font-semibold ml-2 focus:outline-none hover:bg-purple-600 transition-colors duration-300"
        >
          Send
        </button>
      </form>
      </main>
  );
}
