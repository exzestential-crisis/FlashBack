"use client";

import BaseButton from "../BaseButton";

export type TextButtonProps = {
  text?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  variant?: "default" | "danger" | "success";
  textSize?: string;
  img?: string;
  imgClass?: string;
  style?: string;
};

export default function TextButton({
  text = "Button",
  type = "button",
  onClick,
  disabled = false,
  fullWidth = false,
  variant = "default",
  textSize = "text-md",
  img = "",
  imgClass = "",
  style = "",
}: TextButtonProps) {
  return (
    <BaseButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      fullWidth={fullWidth}
      variant={variant}
      style={`${textSize} ${style}`}
    >
      {img && <img src={img} className={imgClass} alt="" />}
      {text}
    </BaseButton>
  );
}
