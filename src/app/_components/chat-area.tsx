import React, { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Sidebar from "./sidebar";
import { Drawer } from "antd";

function ChatArea() {
  const [showSidebar, setShowSidebar] = useState(false);
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
