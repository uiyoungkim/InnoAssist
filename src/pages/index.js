import axios from "axios";
import { useEffect, useState } from "react";

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

  const sendMessage = (message) => {
    const url = "https://api.openai.com/v1/chat/completions";
    const Authentification = `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`;
    const headers = {
      Authorization: Authentification,
    };

    const data = {
      model: "gpt-4-turbo-preview",
      messages: [{ role: "user", content: message }],
      temperature: 0.7,
    };

    setIsLoading(true);

    axios
      .post(url, data, { headers: headers })
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
    <>
      <h1>ChatGPT</h1>
      {chatLog.map((message, index) => (
        <div key={index}> {message.message} </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type a message"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
}
