"use client";
// app/signup/components/SignupFlow.tsx
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/stores/notification";
import { useLoadingStore } from "@/stores/loading";

import { AnimatedButton, ArrowBack } from "@/components/ui";

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
  const { add: addNotification } = useNotifications(); // use the store method
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
      const signupData = {
        username: form.username,
        email: form.email,
        password: form.password,
        user_type: form.user_type,
        interests: form.interests,
        timestamp: Date.now(),
      };

      sessionStorage.setItem("pendingSignup", JSON.stringify(signupData));

      const response = await fetch("/api/auth/send-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: form.email, username: form.username }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/verification");
      } else {
        addNotification(
          data.error || "Failed to send verification email",
          "error"
        );
      }
    } catch (error) {
      console.error("Signup error:", error);
      addNotification("An error occurred. Please try again.", "error");
    } finally {
      hideLoading();
    }
  };

  return (
    <>
      {/* Back Button */}

      <div className="absolute top-28 left-5 lg:top-30 lg:left-40">
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
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-zinc-900 p-4 z-20">
            <AnimatedButton
              text="Continue"
              onClick={() => goToStep(step + 1)}
              disabled={animating || !canContinue()}
              style="w-full py-4"
            />
          </div>

          {/* Desktop Button - positioned as before, only visible on desktop */}
          <div className="hidden lg:block fixed bottom-20 right-20">
            <AnimatedButton
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
