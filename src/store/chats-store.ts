import { create } from "zustand";

const chatsGlobalStore = create((set) => ({
  // This will hold the current chat
  selectedChat: null,
  setSelectedChat: (data: unknown) => set({ selectedChat: data }),

  // This will hold the chats for the logged-in user
  userChats: [],
  setUserChats: (data: unknown) => set({ userChats: data }),
}));

export default chatsGlobalStore;
