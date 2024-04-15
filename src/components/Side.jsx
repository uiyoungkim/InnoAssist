import React, { useRef, useState, useEffect } from "react";
import { Button, Modal, TextInput, Sidebar, Label } from "flowbite-react";

function Side({ chatLog, updateChatLog }) {
  const [open, setOpen] = useState(false);
  const [openChatNameModal, setOpenChatNameModal] = useState(false);
  const chatNameInputRef = useRef();
  const [chatNameError, setChatNameError] = useState("");
  const [chatLogError, setChatLogError] = useState("");
  const [previousChats, setPreviousChats] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getUserName = async () => {
    fetch("/api/user")
      .then((response) => {
        if (!response.ok) {
          console.error("Network response was not ok");
        }
        return response.json();
      })
      .then((userName) => {
        console.log("Success:", userName.username);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const loadChats = async () => {
    if (!isLoggedIn) {
      alert("Please log in before trying to load chats.");
      return;
    }
    try {
      const response = await fetch("/api/chat/getChat");
      const data = await response.json();
      setPreviousChats(data);
      console.log(JSON.stringify(data));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getUserName();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      loadChats();
    }
  }, [isLoggedIn]);

  const saveChat = () => {
    if (!isLoggedIn) {
      alert("Please log in before trying to save chat.");
      return;
    }
    if (!chatLog || Object.keys(chatLog).length === 0) {
      setChatLogError("Chat log cannot be empty.");
      return;
    }
    if (
      chatNameInputRef.current == null ||
      chatNameInputRef.current.value === "" ||
      !chatNameInputRef.current.value
    ) {
      setOpenChatNameModal(true);
      setChatNameError("Chat name cannot be empty.");
      return;
    }
    setOpenChatNameModal(false);
    fetch("/api/chat/saveChat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatLog: chatLog,
        chatName: chatNameInputRef.current.value,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleChatItemClick = (chatName) => {
    const selectedChat = previousChats.find(
      (chat) => chat.chatName === chatName
    );
    updateChatLog(selectedChat.chatData);
  };

  return (
    <>
      <Button
        className="bg-background-600 rounded-md w-full hover:bg-primary-400 fixed"
        onClick={() => setOpen(!open)}
      >
        Toggle Sidebar
      </Button>
      {open && (
        <Sidebar className="h-auto bg-background-800 text-background-100 rounded-lg px-2 mt-14 fixed">
          <div className="my-3 space-y-2">
            <button
              className="bg-background-600 rounded-md w-full hover:bg-primary-400"
              onClick={() => updateChatLog([
                {
                  type: "ai",
                  message:
                    "Hello! I'm InnoAssist, your AI assistant. How can I help you today?",
                },
              ])}
            >
              Clear Chat
            </button>
            <button
              className="bg-background-600 rounded-md w-full hover:bg-primary-400"
              onClick={saveChat}
            >
              Save Chat
            </button>
            {chatLogError && <p className="text-red-500">{chatLogError}</p>}
            <button
              className="bg-background-600 rounded-md w-full hover:bg-primary-400"
              onClick={loadChats}
            >
              Load Chats
            </button>
          </div>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              {previousChats.length > 0 &&
                previousChats.map((chat) => (
                  <button
                    key={chat.id}
                    className="bg-background-800 rounded-md w-full hover:bg-primary-400"
                    onClick={() => handleChatItemClick(chat.chatName)}
                  >
                    {chat.chatName}
                  </button>
                ))}
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      )}
      <Modal
        show={openChatNameModal}
        className="flex w-1/4 h-fit justify-center text-text-50 bg-background-600 border-primary-500 mx-auto mt-28"
        popup
        onClose={() => setOpenChatNameModal(false)}
        initialFocus={chatNameInputRef}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium">
              Please give this Chat a name
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Chat name" />
              </div>
              <TextInput
                id="chatName"
                ref={chatNameInputRef}
                placeholder="Chat 1"
                required
                className="text-text-800"
              />
              {chatNameError && <p className="text-red-500">{chatNameError}</p>}
            </div>
            <div className="w-full">
              <Button
                className="bg-primary-200 hover:bg-primary-400"
                onClick={saveChat}
              >
                Save Chat
              </Button>
              <Button
                className="text-primary-200 hover:text-primary-50"
                onClick={() => {
                  setOpenChatNameModal(false);
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Side;
