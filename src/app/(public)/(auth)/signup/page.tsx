// app/signup/page.tsx (Server Component)
import SignupFlow from "./SignupFlow";

export default function SignupPage() {
  return (
    <div className="relative flex min-h-screen overflow-x-hidden">
      <SignupFlow />
    </div>
  );
}
