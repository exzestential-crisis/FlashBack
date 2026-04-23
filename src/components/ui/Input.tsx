"use client";

import { useState, ChangeEvent } from "react";
import { ClosedEye, OpenEye } from "@/components/icons";

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

  // Base styles that are common to both variants
  const baseStyles = `
    w-full
    px-3 py-2 sm:px-4 sm:py-3
    text-sm sm:text-base
    rounded-xl
    focus:outline-none focus:ring-2 
    transition-all duration-200
  `;

  // Variant-specific styles
  const variantStyles = {
    blue: `
        text-slate-900 dark:text-white
        bg-sky-100 dark:bg-slate-800 
        border border-sky-200 dark:border-slate-700
        focus:ring-sky-500 focus:border-sky-500
        dark:focus:ring-sky-800 dark:focus:border-sky-800
        placeholder:text-slate-500 dark:placeholder:text-slate-400
        `,
    plain: `
        text-slate-900 dark:text-white
        bg-zinc-100 dark:bg-zinc-700
        border border-zinc-200 dark:border-zinc-600
        focus:ring-sky-500 focus:border-sky-500
        dark:focus:ring-sky-800 dark:focus:border-sky-800
        placeholder:text-slate-500 dark:placeholder:text-slate-400
        `,
  };

  const inputType =
    type === "password" && showPasswordToggle
      ? passwordVisible
        ? "text"
        : "password"
      : type;

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
          ${className}
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
      />

      {/* Password visibility toggle */}
      {type === "password" && showPasswordToggle && (
        <button
          type="button"
          className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 flex items-center cursor-pointer text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          onClick={togglePasswordVisibility}
          disabled={disabled}
        >
          {passwordVisible ? <ClosedEye /> : <OpenEye />}
        </button>
      )}
    </div>
  );
}
