import { Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { message } from "antd";
import { getChatsByUserId } from "@/actions/chats";
import usersGlobalStore from "@/store/users-store";
import chatsGlobalStore from "@/store/chats-store";

function Sidebar({
  setShowSidebar = () => {},
}: {
  setShowSidebar?: (show: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [hoveredChatId, setHoveredChatId] = useState("");
  const { loggedInUserData } = usersGlobalStore() as any;
  const { userChats, setUserChats, selectedChat, setSelectedChat } =
    chatsGlobalStore() as any;

  const getChats = async () => {
    try {
      setLoading(true);
      const response = await getChatsByUserId(loggedInUserData._id);
      // console.log("Fetched Chats:", response);

      if (response.success) {
        setUserChats(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error("Failed to fetch chats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getChats();
  }, []);

  return (
    <div className="w-80 bg-sidebar p-5">
      <div className="flex gap-2 border border-gray-200 border-solid text-gray-200 p-2 rounded-sm w-max text-sm items-center">
        <Plus size={15} />
        New Chat
      </div>

      <div className="flex flex-col mt-8">
        <h1 className="text-gray-300 font-bold">Chats</h1>

        <div className="flex flex-col gap-3 mt-4">
          {userChats.map((chat: any) => (
            <div
              key={chat._id}
              className="cursor-pointer flex justify-between items-center"
              onMouseEnter={() => setHoveredChatId(chat._id)}
              onMouseLeave={() => setHoveredChatId("")}
            >
              <span
                className="text-base text-white"
                onClick={() => {
                  setSelectedChat(chat);
                }}
              >
                {chat.title}
              </span>

              {hoveredChatId === chat._id && (
                <Trash2 size={18} className="text-red-400" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
