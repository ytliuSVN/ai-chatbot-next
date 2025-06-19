// This file is part of a custom sign-up page for Clerk in a Next.js application.
// see: https://clerk.com/docs/references/nextjs/custom-sign-up-page
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen bg-chatarea">
      <SignUp />
    </div>
  );
}
