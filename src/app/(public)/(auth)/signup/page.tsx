// app/signup/page.tsx (Server Component)
import { Metadata } from "next";
import SignupFlow from "./SignupFlow";

export const metadata: Metadata = {
  title: "Signup - FlashBack",
  description: "Register for a Flashback Account",
};

export default function SignupPage() {
  return (
    <div className="relative flex min-h-screen overflow-x-hidden">
      <SignupFlow />
    </div>
  );
}
