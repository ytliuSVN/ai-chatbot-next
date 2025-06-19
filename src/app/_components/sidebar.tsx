import { FilePlus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { message, Spin } from "antd";
import Image from "next/image";
import { deleteChat, getChatsByUserId } from "@/actions/chats";
import usersGlobalStore from "@/store/users-store";
import chatsGlobalStore from "@/store/chats-store";
import classNames from "classnames";

function Sidebar({
  setShowSidebar = () => {},
}: {
  setShowSidebar?: (show: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [hoveredChatId, setHoveredChatId] = useState("");
  const [selectedChatForDelete, setSelectedChatForDelete] = useState(null);

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

  const deleteChatHandler = async (chatId: string) => {
    try {
      setSelectedChatForDelete(chatId);

      const response = await deleteChat(chatId);

      if (response.success) {
        // Remove the deleted chat from the userChats state
        const updatedChats = userChats.filter(
          (chat: any) => chat._id !== chatId
        );
        setUserChats(updatedChats);

        if (selectedChat?._id === chatId) {
          setSelectedChat(null); // Clear selected chat if it was deleted
        }
        // Show success message
        // message.success("Chat deleted successfully");
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setSelectedChatForDelete(null);
    }
  };

  useEffect(() => {
    getChats();
  }, []);

  return (
    <div className="w-80 bg-sidebar p-5">
      <div className="p-3">
        <button
          onClick={() => {
            setSelectedChat(null);
            setShowSidebar(false); // mobile view
          }}
          className="flex gap-2 items-center text-base bg-purple-800 hover:bg-gray-700 text-amber-50 font-bold py-2 px-4 rounded-full cursor-pointer"
        >
          <FilePlus size={15} />
          New chat
        </button>
      </div>

      <div className="flex flex-col mt-8">
        <h1 className="text-gray-300 font-bold p-3">Chats</h1>

        {loading && (
          <div className="flex h-60 justify-center items-center global-spinner">
            <Spin size="small" />
          </div>
        )}

        {!loading && userChats?.length === 0 && (
          <div className="flex flex-col">
            <span className="text-gray-400 px-2 py-5 text-base italic">
              No chats found
            </span>
          </div>
        )}

        <div className="flex flex-col gap-1 mt-4">
          {userChats.map((chat: any) => (
            <div
              key={chat._id}
              className={classNames(
                "cursor-pointer flex justify-between items-center p-3 hover:bg-gray-700 rounded-xl",
                {
                  "bg-gray-800 rounded-xl": selectedChat?._id === chat._id,
                }
              )}
              onMouseEnter={() => setHoveredChatId(chat._id)}
              onMouseLeave={() => setHoveredChatId("")}
              onClick={() => {
                setSelectedChat(chat);
              }}
            >
              {/* Highlight the selected chat */}
              <span className="text-base text-white truncate w-64">
                {chat.title}
              </span>

              {/* Show delete icon only when hovered */}
              {hoveredChatId === chat._id && (
                <Trash2
                  size={18}
                  className="text-red-400"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChatHandler(chat._id);
                  }}
                />
              )}

              {/* Show loading spinner when deleting */}
              {selectedChatForDelete === chat._id && (
                <div className="global-spinner">
                  <Spin size="small" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
