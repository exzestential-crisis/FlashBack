"use client";

import { useState, ChangeEvent } from "react";
import { ChevronDown } from "../icons";

interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface DropdownProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  placeholder?: string;
  required?: boolean;
  variant?: "plain" | "blue";
  className?: string;
  disabled?: boolean;
}

export default function Dropdown({
  id,
  value,
  onChange,
  options,
  placeholder = "Select...",
  required = false,
  variant = "plain",
  className = "",
  disabled = false,
}: DropdownProps) {
  const [open, setOpen] = useState(false);

  const baseStyles = `
    w-full
    h-11
    px-3 py-2.5 text-sm
    sm:px-3 sm:py-3 sm:text-base
    lg:px-4 lg:py-3 lg:text-base
    rounded-lg sm:rounded-xl
    border
    focus:outline-none focus:ring-2 focus:ring-brand-light
    transition-all duration-200
    min-h-[44px] sm:min-h-[48px]
    cursor-pointer
  `;

  const variantStyles = {
    blue: `
      text-slate-900 dark:text-white
      bg-sky-100 dark:bg-slate-800 
      border-sky-200 dark:border-slate-700
      dark:focus:ring-sky-800 dark:focus:border-sky-800
      placeholder:text-sky-600 dark:placeholder:text-sky-400
    `,
    plain: `
      text-zinc-900 dark:text-white
      bg-zinc-100 dark:bg-zinc-700
      border-zinc-200 dark:border-zinc-600
      dark:focus:ring-sky-800 dark:focus:border-sky-800
      placeholder:text-zinc-500 dark:placeholder:text-zinc-400
    `,
  };

  return (
    <div className="relative w-full">
      <div
        id={id}
        className={`${baseStyles} ${variantStyles[variant]} ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        } ${className} flex items-center justify-between`}
        onClick={() => !disabled && setOpen((prev) => !prev)}
      >
        <span
          className={`${
            value ? "" : "text-zinc-400 dark:text-zinc-500"
          } flex items-center gap-2`}
        >
          {value ? (
            <>
              {options.find((o) => o.value === value)?.icon}
              {options.find((o) => o.value === value)?.label}
            </>
          ) : (
            placeholder
          )}
        </span>
        <ChevronDown />
      </div>

      {required && (
        <span className="absolute right-3 top-3 text-red-500 pointer-events-none text-lg">
          *
        </span>
      )}

      {open && !disabled && (
        <ul className="absolute z-50 w-full mt-2 max-h-60 overflow-auto rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-700 shadow-lg p-2 space-y-1">
          {options.map((opt) => (
            <li
              key={opt.value}
              className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer 
                 hover:bg-zinc-100 dark:hover:bg-zinc-800
                 text-zinc-800 dark:text-zinc-200
                 transition-colors duration-150"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.icon}
              <span>{opt.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
