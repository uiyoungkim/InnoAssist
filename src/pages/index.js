import axios from "axios";
import { useEffect, useState } from "react";
import TypingAnimation from "../components/TypingAnimation";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { type: "user", message: inputValue },
    ]);
    sendMessage(inputValue);
    setInputValue("");
  };

  // Client Side
  const sendMessage = (message) => {
    const url = "/api/chat";

    //Hi

    
    /*
    const Authentification = `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`;
    const headers = {
      "Content-type": "application/json",
      Authorization: Authentification,
    };
    */

    const data = {
      model: "gpt-4-turbo-preview",
      messages: [{ role: "user", content: message }],
      temperature: 0.7,
    };

    setIsLoading(true);

    axios
      .post(url, data)
      .then((response) => {
        console.log(response);
        setChatLog((prevChatLog) => [
          ...prevChatLog,
          { type: "ai", message: response.data.choices[0].message.content },
        ]);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <div className="container mx-auto max-w-full px-4">
      <div className="flex flex-col bg-gray-900 min-h-screen">
        <h1 className="text-center py-3 font-bold text-4xl md:text-6xl bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
          ChatGPT
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

        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex rounded-lg border border-gray-700 bg-gray-800">
            <input
              type="text"
              className="flex-grow px-4 py-2 bg-transparent text-white focus:outline-none"
              placeholder="Type a message"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <div className="text-right">
              <button
                type="submit"
                className="bg-purple-500 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-purple-600 transition-colors duration-300"
              >
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
