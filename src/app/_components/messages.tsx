import { Bot } from "lucide-react";
import React from "react";
import { Spin } from "antd";

function Messages({
  messages,
  isLoading,
}: {
  messages: any[];
  isLoading: boolean;
}) {
  return (
    <div className="flex flex-col gap-7 text-gray-300 mt-7 text-sm">
      {messages.map((message) => {
        // console.log("Message:", message);

        // right side for user messages
        if (message.role === "user") {
          return (
            <div className="flex justify-end" key={message.id}>
              <span className="bg-gray-800 p-3 rounded">{message.content}</span>
            </div>
          );
        }
        // left side for assistant messages (bot)
        return (
          <div className="flex gap-2" key={message.id}>
            <div className="border border-gray-300 border-solid rounded-full h-6 w-6 flex items-center justify-center">
              <Bot size={16} />
            </div>

            <span className="flex-1">{message.content}</span>
          </div>
        );
      })}

      {isLoading && <Spin size="small" />}
    </div>
  );
}

export default Messages;
