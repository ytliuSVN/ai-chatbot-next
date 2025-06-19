import { Bot, Check, Copy, Share } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Button, message, Spin, Tooltip } from "antd";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import usersGlobalStore from "@/store/users-store";
import Typewriter from "typewriter-effect";
import MessageShare from "./message-share";

function Messages({
  messages,
  isLoading,
}: {
  messages: any[];
  isLoading: boolean;
}) {
  const { loggedInUserData } = usersGlobalStore() as any;
  const [copiedMessage, setCopiedMessage] = useState("");
  const [messageToShare, setMessageToShare] = useState("");
  const [openShareModal, setOpenShareModal] = useState(false);

  const messagesRef = useRef(null);

  useEffect(() => {
    if (messagesRef.current) {
      // Scroll to the bottom of the messages container
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  if (!isLoading && messages.length === 0) {
    // TODO: Create a welcome message component
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

  const onCopy = (content: string) => {
    try {
      navigator.clipboard.writeText(content);
      message.success("Content copied to clipboard");
      setCopiedMessage(content);
    } catch (error) {
      message.error("Failed to copy content");
    }
  };

  return (
    <div
      className="flex flex-col gap-7 text-gray-300 mt-7 text-sm h-[75vh] lg:h-[80vh] overflow-y-scroll"
      ref={messagesRef}
    >
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

            <div className="flex-1 flex flex-col gap-5 text-base mr-5">
              <Markdown remarkPlugins={[remarkGfm]}>{message.content}</Markdown>

              <div className="flex gap-2 -ml-2">
                <Tooltip title="Copy" placement="bottom">
                  <Button
                    variant="text"
                    color="purple"
                    onClick={() =>
                      copiedMessage !== message.content &&
                      onCopy(message.content)
                    }
                  >
                    {copiedMessage === message.content ? (
                      <Check size={18} color="#3e9392" />
                    ) : (
                      <Copy size={18} color="#ad39ff" />
                    )}
                  </Button>
                </Tooltip>

                <Tooltip title="Share" placement="bottom">
                  <Button
                    variant="text"
                    color="purple"
                    onClick={() => {
                      // console.log("Sharing message:", message.content);
                      setMessageToShare(message.content);
                      setOpenShareModal(true);
                    }}
                  >
                    <Share size={18} color="#ad39ff" />
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>
        );
      })}

      <div className="flex justify-start global-spinner">
        {isLoading && <Spin size="small" />}
      </div>

      {openShareModal && (
        <MessageShare
          open={openShareModal}
          setOpen={setOpenShareModal}
          messageToShare={messageToShare}
        />
      )}
    </div>
  );
}

export default Messages;
