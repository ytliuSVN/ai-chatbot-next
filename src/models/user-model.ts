import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      // unique: true,
    },
    clerkUserId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Check if the model already exists to avoid overwriting it, e.g. during hot reloading in development
if (mongoose?.models?.users) {
  delete mongoose.models.users;
}

// first argument is collection name, second argument is schema
const UserModel = mongoose.model("users", userSchema);
export default UserModel;
