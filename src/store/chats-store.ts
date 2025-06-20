import { create } from "zustand";
import { devtools } from "zustand/middleware";

const chatsGlobalStore = create(
  devtools(
    (set) => ({
      // This will hold the current chat
      selectedChat: null,
      setSelectedChat: (data: unknown) => set({ selectedChat: data }),

      // This will hold the chats for the logged-in user
      userChats: [],
      setUserChats: (data: unknown) => set({ userChats: data }),
    }),
    // { enabled: false } // Disable devtools in production
  )
);

export default chatsGlobalStore;
