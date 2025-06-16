"use client";

// a patch for Ant Design v5 to work with React 19
import "@ant-design/v5-patch-for-react-19";
// components
import Sidebar from "./_components/sidebar";
import ChatArea from "./_components/chat-area";

export default function Home() {
  return (
    <div className="flex h-screen">

      {/* Sidebar for mobile view */}
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      <div className="flex-1 h-full">
        <ChatArea />
      </div>
    </div>
  );
}
