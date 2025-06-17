import { Bot } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Spin } from "antd";
import ReactMarkdown from "react-markdown";
import usersGlobalStore from "@/store/users-store";
import Typewriter from "typewriter-effect";

function Messages({
  messages,
  isLoading,
}: {
  messages: any[];
  isLoading: boolean;
}) {
  const { loggedInUserData } = usersGlobalStore() as any;

  if (!isLoading && messages.length === 0) {
    return (
      <div className="h-[80vh] lg:h-[82vh] flex items-center justify-center">
        <div className="flex flex-col text-gray-400 text-base font-bold">
          <div className="opacity-0 animate-fade-in">
            <Image
              src="bot-welcome.svg"
              alt="Welcome Bot"
              width={128}
              height={128}
              className="mx-auto my-4"
              priority
            />
          </div>

          <div className="text-xl text-gray-300 font-bold">
            <Typewriter
              options={{
                strings: [
                  `Hey, ${loggedInUserData.name}`,
                  "How can I help you today?",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-7 text-gray-300 mt-7 text-sm h-[75vh] lg:h-[80vh] overflow-y-scroll">
      {messages.map((message) => {
        // console.log("Message:", message);

        // right side for user messages
        if (message.role === "user") {
          return (
            <div className="flex justify-end mr-5" key={message.id}>
              <span className="bg-gray-800 p-3 rounded text-base">
                {message.content}
              </span>
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
