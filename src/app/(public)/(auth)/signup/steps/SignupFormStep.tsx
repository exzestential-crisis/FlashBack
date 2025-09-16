"use client";
// app/signup/components/SignupFormStep.tsx
import { useState, ChangeEvent } from "react";
import { useHandleEnterPress } from "@/hooks/ui/useHandleEnterPress";

import { AnimatedButton, LightButton } from "@/components/ui";
import Input from "@/components/forms/Input";

import { Facebook, Google } from "../../../../../../public";
import { FormData } from "../SignupFlow";

interface SignupFormStepProps {
  form: FormData;
  onFormChange: (key: string, value: string) => void;
  onSubmit: () => void;
  animationClass: string;
  isLoading: boolean;
}

export default function SignupFormStep({
  form,
  onFormChange,
  onSubmit,
  animationClass,
  isLoading,
}: SignupFormStepProps) {
  const [emailRequirementsMet, setEmailRequirementsMet] = useState({
    hasAtSymbol: false,
    validDomain: false,
  });

  const [passwordRequirementsMet, setPasswordRequirementsMet] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
  });

  const emailRequirements = {
    hasAtSymbol: /@/,
    validDomain: /\.[a-z]{2,}$/i,
  };

  const passwordRequirements = {
    length: /.{8,}/,
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    number: /\d/,
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    onFormChange("email", newEmail);

    setEmailRequirementsMet({
      hasAtSymbol: emailRequirements.hasAtSymbol.test(newEmail),
      validDomain: emailRequirements.validDomain.test(newEmail),
    });
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    onFormChange("password", newPassword);

    setPasswordRequirementsMet({
      length: passwordRequirements.length.test(newPassword),
      uppercase: passwordRequirements.uppercase.test(newPassword),
      lowercase: passwordRequirements.lowercase.test(newPassword),
      number: passwordRequirements.number.test(newPassword),
    });
  };

  const isFormComplete =
    passwordRequirementsMet.length &&
    passwordRequirementsMet.uppercase &&
    passwordRequirementsMet.lowercase &&
    passwordRequirementsMet.number &&
    emailRequirementsMet.hasAtSymbol &&
    emailRequirementsMet.validDomain &&
    form.username.trim() !== "";

  const handleKeyPress = useHandleEnterPress({
    onSubmit,
  });

  return (
    <div
      className={`relative flex flex-col items-center min-h-screen w-full pt-40 transition ${animationClass} overflow-hidden`}
    >
      <div className="absolute top-5/12 slide-up flex flex-col w-1/4 items-center">
        <h2 className="text-center text-2xl font-bold mb-4">
          Great! Let's set up your account!
        </h2>

        {/* Delayed Fade in Form */}
        <div className="fade-in-delayed w-4/5">
          {/* Form */}
          <form onKeyDown={handleKeyPress} className="w-full">
            <div className="flex flex-col">
              <Input
                type="email"
                value={form.email}
                onChange={handleEmailChange}
                placeholder="Email"
                variant="plain"
                className="lg:mt-4"
                required
              />

              {/* Email requirements */}
              {form.email &&
                (!emailRequirementsMet.hasAtSymbol ||
                  !emailRequirementsMet.validDomain) && (
                  <p className="text-sm text-rose-500 lg:mt-2">
                    Please enter a valid email address
                  </p>
                )}

              <Input
                type="text"
                value={form.username}
                onChange={(e) => onFormChange("username", e.target.value)}
                placeholder="Username"
                variant="plain"
                className="lg:mt-4"
                required
              />

              <Input
                type="password"
                value={form.password}
                onChange={handlePasswordChange}
                placeholder="Password"
                variant="plain"
                className="lg:mt-4"
                showPasswordToggle
                required
              />

              {/* Password Requirements */}
              {form.password &&
                (!passwordRequirementsMet.length ||
                  !passwordRequirementsMet.uppercase ||
                  !passwordRequirementsMet.lowercase ||
                  !passwordRequirementsMet.number) && (
                  <div className="flex flex-col lg:mt-2">
                    <p
                      className={`text-sm ${
                        passwordRequirementsMet.length
                          ? "text-green-400"
                          : "text-rose-500"
                      }`}
                    >
                      At least 8 characters
                    </p>
                    <p
                      className={`text-sm ${
                        passwordRequirementsMet.uppercase
                          ? "text-green-400"
                          : "text-rose-500"
                      }`}
                    >
                      At least 1 uppercase character
                    </p>
                    <p
                      className={`text-sm ${
                        passwordRequirementsMet.lowercase
                          ? "text-green-400"
                          : "text-rose-500"
                      }`}
                    >
                      At least 1 lowercase character
                    </p>
                    <p
                      className={`text-sm ${
                        passwordRequirementsMet.number
                          ? "text-green-400"
                          : "text-rose-500"
                      }`}
                    >
                      At least 1 number
                    </p>
                  </div>
                )}

              <AnimatedButton
                text="Signup"
                style="mt-4"
                onClick={onSubmit}
                disabled={!isFormComplete || isLoading}
                fullWidth
              />
            </div>

            {/* Api log in */}
            <div>
              <div className="grid grid-cols-7 items-center gap-4 py-4 dark:text-zinc-400">
                <hr className="col-span-3" />
                <p className="text-center">or</p>
                <hr className="col-span-3" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <LightButton
                  text="Facebook"
                  img={Facebook}
                  imgClass="h-5 rounded-full me-2"
                  fullWidth
                />
                <LightButton
                  text="Google"
                  img={Google}
                  imgClass="h-5 rounded-full me-2"
                  fullWidth
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 text-center mt-8 text-black/40 dark:text-zinc-400">
              <p>
                By signing in to FlashBack, you agree to our Terms and Privacy
                Policy.
              </p>
              <p>
                This site is protected by reCAPTCHA Enterprise and the Google
                Privacy Policy and Terms of Service apply.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
