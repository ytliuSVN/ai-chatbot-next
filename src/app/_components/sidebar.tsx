import { Plus } from "lucide-react";
import React from "react";

function Sidebar({
  setShowSidebar = () => {},
}: {
  setShowSidebar?: (show: boolean) => void;
}) {
  return (
    <div className="w-80 bg-sidebar p-5">
      <div className="flex gap-2 border border-gray-200 border-solid text-gray-200 p-2 rounded-sm w-max text-sm items-center">
        <Plus size={15} />
        New Chat
      </div>
    </div>
  );
}

export default Sidebar;
