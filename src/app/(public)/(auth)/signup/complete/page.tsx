"use client";
// app/signup/complete/page.tsx
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
          <svg
            aria-hidden="true"
            className="w-12 h-12 mx-auto text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>

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
