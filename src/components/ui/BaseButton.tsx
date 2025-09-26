"use client";

import React from "react";

export type BaseButtonProps = {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: string;
  rounded?: string;
  children?: React.ReactNode;
};

export default function BaseButton({
  type = "button",
  onClick,
  disabled = false,
  fullWidth = false,
  style = "",
  rounded = "rounded-xl",
  children,
}: BaseButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    onClick?.();
  };

  return (
    <div>
      <button
        type={type}
        onClick={handleClick}
        className={`
          ${style}
          ${rounded}
          ${fullWidth ? "w-full" : ""}
          cursor-pointer
          flex items-center justify-center
          p-2.5 gap-4
          text-white font-medium
          bg-brand
          shadow-[0_4px_0_theme('colors.brand.dark')] 

          transition
          hover:bg-brand-light 
          hover:shadow-[0_4px_0_theme('colors.brand')] 
          hover:translate-y-[1px]

          focus:bg-brand-dark 
          focus:shadow-none
          focus:translate-y-1

          disabled:opacity-50
          disabled:cursor-not-allowed
          disabled:hover:bg-brand 
          disabled:hover:shadow-[0_4px_0_theme('colors.brand.dark')]
          disabled:hover:translate-y-0
        `}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
}
