import React, { useState } from "react";

function Navbar({ onNewChat, previousChats, onSelectChat }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNewChatClick = () => {
    onNewChat();
  };

  const handleChatSelection = (index) => {
    onSelectChat(index);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="block lg:hidden h-8 w-auto"
                src="/logo.svg"
                alt="Logo"
              />
              <img
                className="hidden lg:block h-8 w-auto"
                src="/logo.svg"
                alt="Logo"
              />
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  About
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Services
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <button
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-md text-sm focus:outline-none"
              onClick={handleNewChatClick}
            >
              New Chat
            </button>
            <div className="relative ml-3">
              <button
                className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-md text-sm focus:outline-none"
                onClick={toggleDropdown}
              >
                Previous Chats
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md bg-white shadow-lg">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    {previousChats.map((chat, index) => (
                      <button
                        key={index}
                        onClick={() => handleChatSelection(index)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                        role="menuitem"
                      >
                        Chat {index + 1}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
