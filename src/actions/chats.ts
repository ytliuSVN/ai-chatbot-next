"use server";

import ChatModel from "@/models/chat-model";

/**
 * Function to save a new chat
 * @param payload
 * @returns
 */
export const saveNewChat = async (payload: any) => {
  try {
    // important: Ensure that the payload contains the user ID and title
    const response = await ChatModel.create(payload);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(response)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

/**
 * Function to get all chats by user ID
 * @param userId
 * @returns
 */
export const getChatsByUserId = async (userId: string) => {
  try {
    const response = await ChatModel.find({ user: userId }).sort({
      createdAt: -1, // Sort by createdAt in descending order (newest first)
    });
    return {
      success: true,
      data: JSON.parse(JSON.stringify(response)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

/**
 * Function to update a chat by chat ID
 * @param chatId
 * @param messages
 * @returns
 */
export const updateChat = async ({
  chatId = "",
  messages = [],
}: {
  chatId: string;
  messages: any[];
}) => {
  try {
    const response = await ChatModel.findByIdAndUpdate(
      chatId,
      { messages },
      { new: true } // Return the updated document
    );
    return {
      success: true,
      data: JSON.parse(JSON.stringify(response)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

/**
 * Function to delete a chat by chat ID
 * @param chatId
 * @returns
 */
export const deleteChat = async (chatId: string) => {
  try {
    const response = await ChatModel.findByIdAndDelete(chatId);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(response)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
