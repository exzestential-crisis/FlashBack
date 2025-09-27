"use client";

import { useState, ChangeEvent } from "react";

interface TextareaProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  variant?: "plain" | "blue";
  className?: string;
  disabled?: boolean;
}

export default function TextArea({
  value,
  onChange,
  placeholder,
  required = false,
  variant = "plain",
  className = "",
  disabled = false,
}: TextareaProps) {
  const baseStyles = `
    w-full
    px-3 py-2.5 text-sm
    sm:px-3 sm:py-3 sm:text-base
    lg:px-4 lg:py-3 lg:text-base
    rounded-lg sm:rounded-xl
    focus:outline-none focus:ring-2 
    transition-all duration-200
    min-h-[100px] sm:min-h-[120px]
    resize-none
  `;

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

  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `
        .replace(/\s+/g, " ")
        .trim()}
    />
  );
}
