"use client";

import BaseButton from "../BaseButton";
import { FaPlus } from "react-icons/fa";

type PlusButtonProps = {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  style?: string;
  size?: string; // For you to control dimensions
};

export default function PlusButton({
  type = "button",
  onClick,
  disabled = false,
  style = "",
  size = "w-12 h-12", // Default size, you can override
}: PlusButtonProps) {
  return (
    <BaseButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      fullWidth={false}
      rounded="rounded-full"
      style={`${size} ${style} p-0`} // Override the rounded-xl with rounded-full and remove padding
    >
      <FaPlus className="w-full h-full" />
    </BaseButton>
  );
}
