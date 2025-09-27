"use client";
import { supabase } from "@/utils/supabase/client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import Input from "@/components/forms/Input";
import { TextButton, LightButton } from "@/components/ui/custom";
import { ArrowBack } from "@/components/icons";
import { Google } from "../../../../../public";

export default function Login() {
  // data
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  const handleSubmit = async () => {
    if (!isFormValid) return;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      console.log("Logged in!", data);
      // Redirect after successful login
      router.push("/"); // or router.push("/dashboard") if you have a private page
    }
  };

  const handleOAuthSignIn = async (provider: "google" | "facebook") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });

    console.log(
      "OAuth redirect URL:",
      `${window.location.origin}/api/auth/callback`
    );

    if (error) {
      console.error("OAuth error:", error);
      setError(error.message);
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Back Button */}
      <div className="absolute top-16 left-2 sm:top-30 sm:left-40">
        <ArrowBack defaultBack />
      </div>

      {/* Login Form Container */}
      <div className="flex flex-col justify-center items-center w-full px-4 sm:px-10 pt-30 sm:pt-50">
        {/* Title */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center text-slate-900 dark:text-white">
          Login
        </h1>

        {/* Form Container */}
        <div className="w-full max-w-xs sm:max-w-sm">
          <form className="w-full">
            <div className="flex flex-col gap-4 w-full">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />

              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                showPasswordToggle
                required
              />

              {error && (
                <p className="text-sm text-rose-500 -mt-1 px-1">{error}</p>
              )}

              <TextButton
                text="Login"
                onClick={handleSubmit}
                style="w-full"
                fullWidth
                disabled={!isFormValid}
              />
            </div>

            {/* Social Login */}
            <div className="w-full mt-4">
              <div className="grid grid-cols-7 items-center gap-4 p-4 mt-2 text-black/40 dark:text-zinc-400">
                <hr className="col-span-3" />
                <p className="text-center text-sm">or</p>
                <hr className="col-span-3" />
              </div>

              <LightButton
                text="Google"
                img={Google.src}
                imgClass="h-4 sm:h-5 rounded-full me-2"
                variant="colored"
                onClick={() => handleOAuthSignIn("google")}
                fullWidth
              />
            </div>
          </form>

          {/* Terms and Privacy */}
          <div className="flex flex-col gap-3 sm:gap-4 text-center mt-6 sm:mt-8 text-black/40 dark:text-zinc-400 py-4">
            <p className="text-xs sm:text-sm leading-relaxed">
              By signing in to FlashBack, you agree to our Terms and Privacy
              Policy.
            </p>
            <p className="text-xs sm:text-sm leading-relaxed">
              This site is protected by reCAPTCHA Enterprise and the Google
              Privacy Policy and Terms of Service apply.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
