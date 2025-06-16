import React, { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Sidebar from "./sidebar";
import { Drawer } from "antd";

import { useChat } from "@ai-sdk/react";

function ChatArea() {
  const [showSidebar, setShowSidebar] = useState(false);

  // Using the useChat hook to manage chat messages and input
  const { messages, input, handleInputChange, handleSubmit } = useChat({});

  return (
    <div className="bg-chatarea h-full p-5">
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

        {messages.map((message) => (
          <div key={message.id}>
            {message.role === "user" ? "User: " : "AI: "}
            {message.content}
          </div>
        ))}

        <form onSubmit={handleSubmit}>
          <input name="prompt" value={input} onChange={handleInputChange} />
          <button type="submit">Submit</button>
        </form>

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
