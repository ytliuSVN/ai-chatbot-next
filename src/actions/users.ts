"use server"; // use server-side actions

import { connectMongoDB } from "@/config/database";
import UserModel from "@/models/user-model";
import { currentUser } from "@clerk/nextjs/server";

connectMongoDB(); // Ensure MongoDB connection is established

export const saveCurrentUser = async () => {
  try {
    const user = await currentUser();

    const existingUser = await UserModel.findOne({
      clerkUserId: user?.id,
    });

    // If the user already exists, return the existing user data
    if (existingUser) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(existingUser)),
      };
    }

    const userObj = {
      name: `${user?.firstName} ${user?.lastName}`,
      email: user?.emailAddresses[0]?.emailAddress,
      clerkUserId: user?.id,
    };
    const newUser = await UserModel.create(userObj);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(newUser)),
    };
  } catch (error) {
    console.error("Error saving current user:", error);
    return {
      success: false,
    };
  }
};
