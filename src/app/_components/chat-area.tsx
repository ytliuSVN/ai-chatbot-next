import React, { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { Menu, Send } from "lucide-react";
import Sidebar from "./sidebar";
import { Drawer, message } from "antd";
import chatsGlobalStore from "@/store/chats-store";
import usersGlobalStore from "@/store/users-store";
import { createNewChat, updateChat } from "@/actions/chats";

import { useChat } from "@ai-sdk/react";
import Messages from "./messages";

function ChatArea() {
  const [showSidebar, setShowSidebar] = useState(false);

  // Using the useChat hook to manage chat messages and input
  // see: https://ai-sdk.dev/docs/ai-sdk-ui/chatbot
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    setMessages, // see https://ai-sdk.dev/docs/ai-sdk-ui/chatbot#modify-messages
  } = useChat({
    api: "api/chat", // replace with your API endpoint
    initialMessages: [], // put the selected chat messages here if needed
  });
  const isLoading = status === "submitted";

  // Function to add or update chat in the database
  const { selectedChat, setSelectedChat } = chatsGlobalStore() as any;
  const { loggedInUserData } = usersGlobalStore() as any;

  const addOrUpdateChat = async () => {
    try {
      // If there are no messages, do nothing
      if (messages.length === 0) return;

      // If selectedChat is null, create a new chat
      if (!selectedChat) {
        const response = await createNewChat({
          user: loggedInUserData._id,
          title: messages[0].content, // Use the first message as the title
          messages,
        });

        if (response.success) {
          setSelectedChat(response.data);
        } else {
          throw new Error(response.message);
        }
      } else {
        // If selectedChat exists, update it with the new messages
        const response = await updateChat({
          chatId: selectedChat._id,
          messages,
        });

        if (!response.success) {
          throw new Error(response.message);
        }
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    // console.log("Messages updated:", messages);
    addOrUpdateChat();
  }, [messages]);

  useEffect(() => {
    if (selectedChat) {
      // display the messages of the selected chat
      setMessages(selectedChat.messages);
    } else {
      // clear the messages if no chat is selected
      setMessages([]);
    }
  }, [selectedChat]);

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
            {/* <h1 className="text-xl font-bold text-pink-500">Chat Area</h1> */}
          </div>

          <UserButton />
        </div>

        <div className="flex flex-col justify-between flex-1">
          <div className="text-white">
            <Messages messages={messages} isLoading={isLoading} />
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
