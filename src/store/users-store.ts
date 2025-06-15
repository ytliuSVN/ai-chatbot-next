import { create } from "zustand";

const usersGlobalStore = create((set) => ({
  loggedInUserData: null,
  // Function to set the logged-in user data
  // This function can be used to update the user data in the global state
  setLoggedInUserData: (data: unknown) => set({ loggedInUserData: data }),
}));

export default usersGlobalStore;
