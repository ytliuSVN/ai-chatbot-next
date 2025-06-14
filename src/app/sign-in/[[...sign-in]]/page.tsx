// This file is part of a custom sign-in page for Clerk in a Next.js application.
// see: https://clerk.com/docs/references/nextjs/custom-sign-in-or-up-page
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  );
}
