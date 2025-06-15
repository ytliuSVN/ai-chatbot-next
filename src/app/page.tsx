import { saveCurrentUser } from "@/actions/users";
import { connectMongoDB } from "@/config/database";
import { UserButton } from "@clerk/nextjs";
// import { currentUser } from "@clerk/nextjs/server";

import Image from "next/image";

connectMongoDB(); // Ensure MongoDB connection is established

export default async function Home() {
  const userResponse = await saveCurrentUser();
  const user = userResponse.data;

  // const user = await currentUser();
  // console.log("Current User:", user);

  const name = user?.name;
  const email = user?.email;
  const clerkUserId = user?.clerkUserId;

  return (
    <div className="p-5 flex flex-col gap-5">
      <h1 className="font-bold">AI Chatbot</h1>
      <UserButton />

      <h1>Name: {name}</h1>
      <h1>Email: {email}</h1>
      <h1>Clerk User Id: {clerkUserId}</h1>
      <h1>Mongo User Id: {user._id}</h1>

      <Image
        className="rounded-full"
        src={user?.imageUrl || "/default-avatar.png"}
        alt="Clerk Logo"
        width={100}
        height={100}
        priority // Ensure the image is loaded as soon as possible
      />
    </div>
  );
}
