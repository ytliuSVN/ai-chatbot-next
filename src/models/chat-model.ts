import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema(
  {
    // fields for the chat model
    user: {
      type: Schema.Types.ObjectId,
      ref: "users", // reference to the user model
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    messages: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

if (mongoose?.models?.chats) {
  delete mongoose.models.chats;
}

const ChatModel = mongoose.model("chats", chatSchema);
export default ChatModel;
