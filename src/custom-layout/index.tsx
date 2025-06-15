"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { saveAndGetCurrentUser } from "@/actions/users";
import usersGlobalStore from "@/store/users-store";
import { message, Spin } from "antd";

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
  // put global state management here if needed
  const { loggedInUserData, setLoggedInUserData }: any = usersGlobalStore();

  const [loading, setLoading] = useState(false);

  const getLoggedInUser = async () => {
    try {
      setLoading(true);
      // console.log("Fetching logged-in user data...");
      const response: any = await saveAndGetCurrentUser();

      if (response.success) {
        // Set the logged-in user data in the global store
        setLoggedInUserData(response.data);
      } else {
        message.error(response.message || "Failed to fetch user data");
      }
    } catch (error) {
      message.error("An error occurred while fetching user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // console.log("CustomLayout mounted");
    getLoggedInUser();
  }, []); // only run once when the component mounts

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center global-spinner">
        <Spin size="large" />
      </div>
    );
  }

  // console.log("Logged-in User Data:", loggedInUserData);
  // fix for the case when loggedInUserData is null
  // This can happen if the user is not logged in or if the data has not been fetched yet
  if (!loggedInUserData) return null;

  return <>{children}</>;
}
