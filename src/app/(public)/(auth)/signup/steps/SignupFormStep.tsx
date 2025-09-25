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
      className={`
        relative flex flex-col items-center min-h-screen w-full 
        px-4 sm:px-6 md:px-8 lg:px-0
        pt-8 sm:pt-16 md:pt-24 lg:pt-40 
        transition ${animationClass} overflow-hidden`}
    >
      <div
        className="
          absolute top-1/2 sm:top-5/12 -translate-y-1/2 sm:translate-y-0 
          slide-up flex flex-col 
          w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/4
          max-w-md 
          items-center"
      >
        <h2
          className="
            text-center 
            text-2xl sm:text-2xl lg:text-3xl 
            font-bold 
            mb-6 sm:mb-6 lg:mb-8
            px-4 sm:px-0"
        >
          Great!
          <br />
          Let&apos;s set up your account!
        </h2>

        {/* Delayed Fade in Form */}
        <div
          className="
            fade-in-delayed 
            w-full sm:w-4/5 lg:w-full
            px-2 sm:px-0"
        >
          {/* Form */}
          <form onKeyDown={handleKeyPress} className="w-full">
            <div className="flex flex-col space-y-4 sm:space-y-4">
              <Input
                type="email"
                value={form.email}
                onChange={handleEmailChange}
                placeholder="Email"
                variant="plain"
                required
              />

              {/* Email requirements */}
              {form.email &&
                (!emailRequirementsMet.hasAtSymbol ||
                  !emailRequirementsMet.validDomain) && (
                  <p className="text-sm sm:text-sm text-rose-500 -mt-1 px-1">
                    Please enter a valid email address
                  </p>
                )}

              <Input
                type="text"
                value={form.username}
                onChange={(e) => onFormChange("username", e.target.value)}
                placeholder="Username"
                variant="plain"
                required
              />

              <Input
                type="password"
                value={form.password}
                onChange={handlePasswordChange}
                placeholder="Password"
                variant="plain"
                showPasswordToggle
                required
              />

              {/* Password Requirements */}
              {form.password &&
                (!passwordRequirementsMet.length ||
                  !passwordRequirementsMet.uppercase ||
                  !passwordRequirementsMet.lowercase ||
                  !passwordRequirementsMet.number) && (
                  <div className="flex flex-col space-y-1 -mt-1 px-1">
                    <p
                      className={`text-sm sm:text-sm ${
                        passwordRequirementsMet.length
                          ? "text-green-400"
                          : "text-rose-500"
                      }`}
                    >
                      At least 8 characters
                    </p>
                    <p
                      className={`text-sm sm:text-sm ${
                        passwordRequirementsMet.uppercase
                          ? "text-green-400"
                          : "text-rose-500"
                      }`}
                    >
                      At least 1 uppercase character
                    </p>
                    <p
                      className={`text-sm sm:text-sm ${
                        passwordRequirementsMet.lowercase
                          ? "text-green-400"
                          : "text-rose-500"
                      }`}
                    >
                      At least 1 lowercase character
                    </p>
                    <p
                      className={`text-sm sm:text-sm ${
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
                onClick={onSubmit}
                disabled={!isFormComplete || isLoading}
                fullWidth
              />
            </div>

            {/* Social login divider */}
            <div>
              <div
                className="
                grid grid-cols-7 items-center gap-2 sm:gap-4 
                  py-6 sm:py-6 
                  dark:text-zinc-400"
              >
                <hr className="col-span-3" />
                <p className="text-center text-base sm:text-base">or</p>
                <hr className="col-span-3" />
              </div>

              {/* Social login buttons */}
              <div className="grid grid-cols-2 gap-4 sm:gap-4">
                <LightButton
                  text="Facebook"
                  img={Facebook}
                  imgClass="h-5 sm:h-5 rounded-full me-2"
                  fullWidth
                />
                <LightButton
                  text="Google"
                  img={Google}
                  imgClass="h-5 sm:h-5 rounded-full me-2"
                  fullWidth
                />
              </div>
            </div>

            {/* Terms and privacy */}
            <div
              className="
                flex flex-col gap-4 sm:gap-4 text-center 
                mt-8 sm:mt-8 
                text-black/40 dark:text-zinc-400
                px-2 sm:px-0"
            >
              <p className="text-sm sm:text-sm leading-relaxed">
                By signing in to FlashBack, you agree to our Terms and Privacy
                Policy.
              </p>
              <p className="text-sm sm:text-sm leading-relaxed">
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
