"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { saveAndGetCurrentUser } from "@/actions/users";
import usersGlobalStore from "@/store/users-store";

export default function CustomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // console.log("Current Pathname:", pathname);

  // If the pathname includes "/sign-in" or "/sign-up", render children directly
  // This allows Clerk's sign-in and sign-up pages to render without the custom layout
  if (pathname.includes("/sign-in") || pathname.includes("/sign-up")) {
    return <>{children}</>;
  }

  // For all other paths, render the custom layout
  // fetch the current user data if needed
  // put global state management or context providers here if needed
  const { setLoggedInUserData }: any = usersGlobalStore();
  const getLoggedInUser = async () => {
    try {
      // console.log("Fetching logged-in user data...");
      const response: unknown = await saveAndGetCurrentUser();

      if (response.success) {
        // Set the logged-in user data in the global store
        setLoggedInUserData(response.data);
      } else {
        // todo: handle error case
      }
    } catch (error) {
      // todo: handle error case
    } finally {
      // todo: set loading state to false
    }
  };

  useEffect(() => {
    // console.log("CustomLayout mounted");
    getLoggedInUser();
  }, []); // only run once when the component mounts

  return <>{children}</>;
}
