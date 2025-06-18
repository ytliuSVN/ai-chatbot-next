import { create } from "zustand";
import { devtools } from "zustand/middleware";

const usersGlobalStore = create(
  devtools(
    (set) => ({
      loggedInUserData: null,
      // Function to set the logged-in user data
      // This function can be used to update the user data in the global state
      setLoggedInUserData: (data: unknown) => set({ loggedInUserData: data }),
    }),
    // { enabled: false }
  )
);

export default usersGlobalStore;
