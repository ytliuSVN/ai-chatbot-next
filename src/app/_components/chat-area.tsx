import React from "react";
import { UserButton } from "@clerk/nextjs";

function ChatArea() {
  return (
    <div className="bg-chatarea h-full p-5">
      <div className="flex flex-col h-full">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold text-pink-400">Chat Area</h1>
          <UserButton />
        </div>
      </div>
    </div>
  );
}

export default ChatArea;
