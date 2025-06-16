import React, { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { Menu, Send } from "lucide-react";
import Sidebar from "./sidebar";
import { Drawer } from "antd";

import { useChat } from "@ai-sdk/react";
import Messages from "./messages";

function ChatArea() {
  const [showSidebar, setShowSidebar] = useState(false);

  // Using the useChat hook to manage chat messages and input
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({});

  return (
    <div className="bg-chatarea h-full p-5 flex-col">
      <div className="flex flex-col h-full">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            {/* hamburger menu for mobile view */}
            <Menu
              className="text-white flex lg:hidden cursor-pointer"
              onClick={() => setShowSidebar(true)}
            />
            <h1 className="text-xl font-bold text-pink-500">Chat Area</h1>
          </div>

          <UserButton />
        </div>

        <div className="flex flex-col justify-between flex-1">
          <div className="text-white">
            <Messages messages={messages} isLoading={isLoading}/>
          </div>

          <form onSubmit={handleSubmit} className="relative">
            <input
              name="prompt"
              value={input}
              onChange={handleInputChange}
              id="input"
              placeholder="Type your message here..."
              className="bg-sidebar text-gray-300 p-5 rounded-xl w-full focus:outline-none"
            />

            <button type="submit" disabled={!input.trim()}>
              <Send className="absolute right-5 bottom-5 text-gray-300 cursor-pointer" />
            </button>
          </form>
        </div>

        {showSidebar && (
          <Drawer
            title="Chat Sidebar"
            onClose={() => setShowSidebar(false)}
            open={showSidebar}
            placement="left"
          >
            <Sidebar setShowSidebar={setShowSidebar} />
          </Drawer>
        )}
      </div>
    </div>
  );
}

export default ChatArea;
