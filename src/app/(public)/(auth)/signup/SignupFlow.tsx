"use client";
// app/signup/components/SignupFlow.tsx
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/stores/notification";
import { useLoadingStore } from "@/stores/loading";
import { supabase } from "@/utils/supabase/client";

import { TextButton } from "@/components/ui/custom";
import { ArrowBack } from "@/components/icons";

import UserTypeStep from "./steps/UserTypeStep";
import InterestsStep from "./steps/InterestsStep";
import SignupFormStep from "./steps/SignupFormStep";

export type FormData = {
  user_type: string;
  username: string;
  email: string;
  password: string;
  interests: string[];
};

export default function SignupFlow() {
  const router = useRouter();
  const { add: addNotification } = useNotifications();
  const { isLoading, showLoading, hideLoading } = useLoadingStore();

  // Form data
  const [form, setForm] = useState<FormData>({
    user_type: "",
    username: "",
    email: "",
    password: "",
    interests: [],
  });

  // Navigation state
  const [step, setStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const [fadeNextClass, setFadeNextClass] = useState("fade-in");
  const [showContinueButton, setShowContinueButton] = useState(true);

  const handleFormChange = (key: string, value: string | string[]) => {
    setForm((prevForm) => ({ ...prevForm, [key]: value }));
  };

  const goToStep = (targetStep: number) => {
    if (animating || targetStep === step) return;

    const isForward = targetStep > step;
    setAnimating(true);

    setAnimationClass(isForward ? "slide-out-left" : "slide-out-right");

    setTimeout(() => {
      setStep(targetStep);
      setAnimationClass(isForward ? "slide-in-right" : "slide-in-left");

      setTimeout(() => {
        setAnimating(false);
        setAnimationClass("");
      }, 500);
    }, 500);
  };

  useEffect(() => {
    if (step < 2) {
      setShowContinueButton(true);
      setFadeNextClass("fade-in");
    } else {
      setFadeNextClass("fade-out");
      setTimeout(() => setShowContinueButton(false), 300);
    }
  }, [step]);

  // Store form data in localStorage for OAuth persistence
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      (form.user_type || form.interests.length)
    ) {
      localStorage.setItem(
        "signupFormData",
        JSON.stringify({
          user_type: form.user_type,
          interests: form.interests,
        })
      );
    }
  }, [form.user_type, form.interests]);

  // Load form data from localStorage on component mount (for returning OAuth users)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("signupFormData");
      if (savedData && !form.user_type && !form.interests.length) {
        const parsed = JSON.parse(savedData);
        setForm((prev) => ({ ...prev, ...parsed }));
      }
    }
  }, []);

  const canContinue = () => {
    if (step === 0) {
      return form.user_type !== "";
    } else if (step === 1) {
      return form.interests.length > 0;
    }
    return true;
  };

  const handleSubmit = async () => {
    showLoading();

    try {
      // Sign up with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (error) throw error;

      // Use API route to create user profile
      if (data.user) {
        const response = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: data.user.id,
            email: form.email,
            username: form.username,
            user_type: form.user_type,
            interests: form.interests,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to create user profile");
        }

        // Clean up localStorage after successful email signup
        if (typeof window !== "undefined") {
          localStorage.removeItem("signupFormData");
        }

        addNotification(
          "Account created successfully! Welcome aboard! 🎉",
          "success"
        );
      }

      // Redirect to home page
      router.push("/");
    } catch (err: unknown) {
      console.error("Signup error:", err);
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred during signup.";

      addNotification(message, "error");
    } finally {
      hideLoading();
    }
  };

  return (
    <>
      {/* Back Button */}
      <div className="absolute top-16 left-2 sm:top-30 sm:left-40">
        <button
          onClick={() => goToStep(step - 1)}
          disabled={animating}
          className="fixed z-10"
        >
          {step > 0 ? <ArrowBack /> : <ArrowBack defaultBack />}
        </button>
      </div>

      {/* Step Components */}
      {step === 0 && (
        <UserTypeStep
          form={form}
          onFormChange={handleFormChange}
          animationClass={animationClass}
        />
      )}

      {step === 1 && (
        <InterestsStep
          form={form}
          onFormChange={handleFormChange}
          animationClass={animationClass}
        />
      )}

      {step === 2 && (
        <SignupFormStep
          form={form}
          onFormChange={handleFormChange}
          onSubmit={handleSubmit}
          animationClass={animationClass}
          isLoading={isLoading}
        />
      )}

      {/* Continue Button with Mobile Bar */}
      {showContinueButton && (
        <div className={`${fadeNextClass}`}>
          {/* Mobile Bar - spans full width on mobile, hidden on desktop */}
          <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-zinc-900 p-4 z-20">
            <TextButton
              text="Continue"
              onClick={() => goToStep(step + 1)}
              disabled={animating || !canContinue()}
              style="w-full py-2"
            />
          </div>

          {/* Desktop Button - positioned as before, only visible on desktop */}
          <div className="hidden lg:block fixed bottom-20 right-20">
            <TextButton
              text="Continue"
              onClick={() => goToStep(step + 1)}
              disabled={animating || !canContinue()}
              style="px-14 py-4"
            />
          </div>
        </div>
      )}
    </>
  );
}
