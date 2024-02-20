import axios from "axios";
import { useEffect, useState } from "react";
import TypingAnimation from "../components/TypingAnimation";
import Navbar from "../components/navbar";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [previousChats, setPreviousChats] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.toLowerCase() === "test") {
      const newChatLog = [
        ...chatLog,
        { type: "user", message: inputValue },
        { type: "ai", message: "Sie bekommen ganz sicher 1.0" },
      ];
      setChatLog(newChatLog);
      setInputValue("");
      return;
    }

    const updatedChatLog = [...chatLog, { type: "user", message: inputValue }];
    setChatLog(updatedChatLog);
    sendMessage(inputValue, updatedChatLog); // Pass updated chat log to sendMessage
    setInputValue("");
  };

  const resetChat = () => {
    setInputValue("");
    setChatLog([]);
    setPreviousChats([]); // Reset previous chats
  };
  
/*
    --> Request for Client Side
    const Authentification = `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`;
    const headers = {
      "Content-type": "application/json",
      Authorization: Authentification,
    };
*/
  
  const handleChatSelection = (index) => {
    setChatLog(previousChats[index]);
  };


  // Client Side
  const sendMessage = (message, updatedChatLog) => {
    // Receive updatedChatLog as argument
    const url = "/api/chat";
    const data = {
      model: "gpt-4-turbo-preview",
      messages: [{ role: "user", content: message }],
      temperature: 0.7,
    };

    setIsLoading(true);

    axios
      .post(url, data)
      .then((response) => {
        const aiResponse = {
          type: "ai",
          message: response.data.choices[0].message.content,
        };
        const newChatLog = [...updatedChatLog, aiResponse]; // Append AI response to updatedChatLog
        setChatLog(newChatLog);
        setIsLoading(false);

        // Update previousChats
        setPreviousChats((prevChats) => {
          const updatedChats = [...prevChats];
          updatedChats[0] = newChatLog; // Update the first entry with the latest chat log
          return updatedChats;
        });
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <div className="container mx-auto max-w-full px-4">
      <Navbar
        onNewChat={resetChat}
        previousChats={previousChats}
        onSelectChat={handleChatSelection}
      />
      <div className="flex flex-col bg-gray-900 min-h-screen">
        <h1 className="text-center py-3 font-bold text-4xl md:text-6xl bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
          Personal Assistant
        </h1>

        <div className="flex-grow p-6 overflow-y-auto">
          <div className="flex flex-col space-y-4">
            {chatLog.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`${
                    message.type === "user" ? "bg-purple-500" : "bg-gray-800"
                  } rounded-lg p-4 text-white w-full md:max-w-sm`}
                >
                  {message.message}
                </div>
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
    </div>
  );
}
