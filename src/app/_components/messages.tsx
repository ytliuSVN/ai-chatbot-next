import { Bot } from "lucide-react";
import React from "react";
import { Spin } from "antd";
import ReactMarkdown from "react-markdown";

function Messages({
  messages,
  isLoading,
}: {
  messages: any[];
  isLoading: boolean;
}) {
  return (
    <div className="flex flex-col gap-7 text-gray-300 mt-7 text-sm h-[75vh] lg:h-[80vh] overflow-y-scroll">
      {messages.map((message) => {
        // console.log("Message:", message);

        // right side for user messages
        if (message.role === "user") {
          return (
            <div className="flex justify-end mr-5" key={message.id}>
              <span className="bg-gray-800 p-3 rounded text-base">{message.content}</span>
            </div>
          );
        }
        // left side for assistant messages (bot)
        return (
          <div className="flex gap-2" key={message.id}>
            <div className="border border-gray-300 border-solid rounded-full h-6 w-6 flex items-center justify-center">
              <Bot size={16} />
            </div>

            <span className="flex-1 text-base">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </span>
          </div>
        );
      })}

      <div className="flex justify-start">
        {isLoading && <Spin size="small" />}
      </div>
    </div>
  );
}

export default Messages;
