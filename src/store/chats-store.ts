import { create } from "zustand";

const chatsGlobalStore = create((set) => ({
  selectedChat: null,
  setSelectedChat: (data: unknown) => set({ selectedChat: data }),
}));

export default chatsGlobalStore;
