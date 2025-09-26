// app/signup/complete/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import { useNotifications } from "@/stores/notification";

export default function SignupComplete() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { add: addNotification } = useNotifications();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const completeOAuthSignup = async () => {
      try {
        // Wait for the auth callback to be processed
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Check if user is authenticated
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError) {
          console.error("Auth error:", authError);
          setError("Authentication failed. Please try again.");
          return;
        }

        if (!user) {
          console.error("No user found after OAuth");
          setError("No user session found. Please try signing up again.");
          return;
        }

        // Check if user already has a complete profile
        const { data: existingProfile } = await supabase
          .from("users")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (existingProfile) {
          // User already exists, just redirect to home
          addNotification("Welcome back!", "success");
          router.push("/");
          return;
        }

        // Try to get stored form data
        let formData = null;
        let fromSignupFlow = false;

        if (typeof window !== "undefined") {
          const formDataStr = localStorage.getItem("signupFormData");
          const signupFlowFlag = localStorage.getItem("fromSignupFlow");

          if (formDataStr) {
            try {
              formData = JSON.parse(formDataStr);
            } catch (e) {
              console.error("Failed to parse form data:", e);
            }
          }

          fromSignupFlow = signupFlowFlag === "true";
        }

        // If no form data, redirect to complete profile or home
        if (!formData || !fromSignupFlow) {
          addNotification("Please complete your profile setup.", "info");
          router.push("/profile/setup"); // You might want to create this page
          return;
        }

        // Create user profile with the signup data
        const profileData = {
          user_id: user.id,
          email: user.email,
          username:
            user.user_metadata?.name ||
            user.user_metadata?.full_name ||
            user.email?.split("@")[0] ||
            `user_${user.id.slice(0, 8)}`,
          user_type: formData.user_type,
          interests: formData.interests,
          provider: "oauth",
        };

        const response = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profileData),
        });

        if (!response.ok) {
          const errorData = await response.json();

          // If user already exists, that's okay
          if (response.status === 409) {
            addNotification("Welcome back!", "success");
            router.push("/");
            return;
          }

          throw new Error(errorData.error || "Failed to complete profile");
        }

        // Clean up localStorage
        if (typeof window !== "undefined") {
          localStorage.removeItem("signupFormData");
          localStorage.removeItem("fromSignupFlow");
        }

        addNotification(
          "Welcome! Your account has been set up successfully! 🎉",
          "success"
        );

        // Redirect to home
        router.push("/");
      } catch (error: unknown) {
        console.error("OAuth completion error:", error);

        // Safely extract the message
        const message =
          error instanceof Error ? error.message : "Failed to complete signup";

        setError(message);
      } finally {
        setIsProcessing(false);
      }
    };

    completeOAuthSignup();
  }, [router, addNotification]);

  // Handle retry
  const handleRetry = () => {
    setError(null);
    setIsProcessing(true);
    // Trigger the effect again by forcing a re-render
    window.location.reload();
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold mb-2 text-red-600">
            Setup Failed
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-x-4">
            <button
              onClick={handleRetry}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => router.push("/signup")}
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Back to Signup
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <div className="text-center space-y-4">
          <div className="flex min-h-screen items-center justify-center bg-white dark:bg-zinc-900">
            <div className="flex gap-2">
              <div className="h-6 w-6 animate-bounce rounded-sm bg-zinc-800 dark:bg-zinc-200 [animation-delay:-0.3s]" />
              <div className="h-6 w-6 animate-bounce rounded-sm bg-zinc-800 dark:bg-zinc-200 [animation-delay:-0.15s]" />
              <div className="h-6 w-6 animate-bounce rounded-sm bg-zinc-800 dark:bg-zinc-200" />
            </div>
          </div>

          <h2 className="text-2xl font-semibold">Setting up your account...</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Just a moment while we complete your registration.
          </p>
        </div>
      </div>
    );
  }

  return null;
}
