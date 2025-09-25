"use client";

import { useState, ChangeEvent } from "react";
import ClosedEye from "../../../public/icons/ClosedEye";
import OpenEye from "../../../public/icons/OpenEye";

interface InputProps {
  type?: "text" | "email" | "password";
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  variant?: "plain" | "blue";
  className?: string;
  showPasswordToggle?: boolean;
  disabled?: boolean;
}

export default function Input({
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  variant = "plain",
  className = "",
  showPasswordToggle = false,
  disabled = false,
}: InputProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  // Base styles with proper mobile-first responsive design
  // Base styles with proper mobile-first responsive design
  const baseStyles = `
    w-full
    px-3 py-2.5 text-lg      
    sm:px-3 sm:py-3 sm:text-sm
    lg:px-4 lg:py-3 lg:text-base
    rounded-lg sm:rounded-xl
    focus:outline-none focus:ring-2 
    transition-all duration-200
    min-h-[44px] sm:min-h-[48px]
  `;

  // Variant-specific styles
  const variantStyles = {
    blue: `
        text-slate-900 dark:text-white
        bg-sky-100 dark:bg-slate-800 
        border border-sky-200 dark:border-slate-700
        focus:ring-sky-500 focus:border-sky-500
        dark:focus:ring-sky-800 dark:focus:border-sky-800
        placeholder:text-sky-600 dark:placeholder:text-sky-400
        `,
    plain: `
        text-slate-900 dark:text-white
        bg-zinc-100 dark:bg-zinc-700
        border border-zinc-200 dark:border-zinc-600
        focus:ring-sky-500 focus:border-sky-500
        dark:focus:ring-sky-800 dark:focus:border-sky-800
        placeholder:text-zinc-500 dark:placeholder:text-zinc-400
        `,
  };

  const inputType =
    type === "password" && showPasswordToggle
      ? passwordVisible
        ? "text"
        : "password"
      : type;

  // Responsive eye icon positioning
  const eyeIconPosition = `
    absolute right-2 sm:right-3 
    top-1/2 -translate-y-1/2
    transform flex items-center cursor-pointer
    w-5 h-5 sm:w-6 sm:h-6
  `;

  return (
    <div className="relative w-full">
      <input
        type={inputType}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`
          ${baseStyles}
          ${variantStyles[variant]}
          ${showPasswordToggle && type === "password" ? "pr-10 sm:pr-12" : ""}
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          ${className}
        `
          .replace(/\s+/g, " ")
          .trim()}
      />

      {/* Password visibility toggle */}
      {type === "password" && showPasswordToggle && (
        <div
          className={eyeIconPosition}
          onClick={togglePasswordVisibility}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              togglePasswordVisibility();
            }
          }}
          aria-label={passwordVisible ? "Hide password" : "Show password"}
        >
          {passwordVisible ? <ClosedEye /> : <OpenEye />}
        </div>
      )}
    </div>
  );
}
