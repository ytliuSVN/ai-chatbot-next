"use server";

import { connectMongoDB } from "@/config/database";
import UserModel from "@/models/user-model";
import { currentUser } from "@clerk/nextjs/server";

connectMongoDB(); // Ensure MongoDB connection is established

export const saveCurrentUser = async () => {
  try {
    const user = await currentUser();
    const userObj = {
      name: `${user?.firstName} ${user?.lastName}`,
      email: user?.emailAddresses[0]?.emailAddress,
      clerkUserId: user?.id,
    };

    await UserModel.create(userObj);

    // await UserModel.findOneAndUpdate(
    //   { clerkUserId: userObj.clerkUserId },
    //   userObj,
    //   { upsert: true, new: true, setDefaultsOnInsert: true }
    // );
  } catch (error) {
    console.error("Error saving current user:", error);
    return {
      success: false,
    };
  }
};
