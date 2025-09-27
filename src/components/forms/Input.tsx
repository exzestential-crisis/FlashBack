"use client";

import { useState, ChangeEvent } from "react";
import ClosedEye from "../icons/ClosedEye";
import OpenEye from "../icons/OpenEye";

interface InputProps {
  id?: string;
  type?: "text" | "email" | "password";
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  showRequiredIndicator?: boolean; // <-- new prop
  variant?: "plain" | "blue";
  className?: string;
  showPasswordToggle?: boolean;
  disabled?: boolean;
}

export default function Input({
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  showRequiredIndicator = false, // <-- default false
  variant = "plain",
  className = "",
  showPasswordToggle = false,
  disabled = false,
}: InputProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const baseStyles = `
    w-full
    px-3 py-2.5 text-sm
    sm:px-3 sm:py-3 sm:text-base
    lg:px-4 lg:py-3 lg:text-base
    rounded-lg sm:rounded-xl
    focus:outline-none focus:ring-2 focus:ring-brand-light
    transition-all duration-200
    min-h-[44px] sm:min-h-[48px]
  `;

  const variantStyles = {
    blue: `
      text-slate-900 dark:text-white
      bg-sky-100 dark:bg-slate-800 
      border border-sky-200 dark:border-slate-700
      dark:focus:ring-sky-800 dark:focus:border-sky-800
      placeholder:text-sky-600 dark:placeholder:text-sky-400
    `,
    plain: `
      text-slate-900 dark:text-white
      bg-zinc-100 dark:bg-zinc-700
      border border-zinc-200 dark:border-zinc-600
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

  const eyeIconPosition = `
    absolute right-2 sm:right-3 
    top-1/2 -translate-y-1/2
    transform flex items-center cursor-pointer
    w-5 h-5 sm:w-6 sm:h-6
  `;

  return (
    <div className="relative w-full">
      <input
        id={id}
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

      {required && showRequiredIndicator && (
        <span className="absolute right-3 top-7 -translate-y-1/2 text-red-500 pointer-events-none text-3xl">
          *
        </span>
      )}

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
