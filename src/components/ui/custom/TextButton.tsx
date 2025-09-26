"use client";

import BaseButton from "../BaseButton";

type TextButtonProps = {
  text?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: string;
  textSize?: string;
  img?: string;
  imgClass?: string;
};

export default function TextButton({
  text = "Button",
  type = "button",
  onClick,
  disabled = false,
  fullWidth = false,
  style = "",
  textSize = "text-md",
  img = "",
  imgClass = "",
}: TextButtonProps) {
  return (
    <BaseButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      fullWidth={fullWidth}
      style={`${textSize} ${style}`}
    >
      {img && <img src={img} className={imgClass} alt="" />}
      {text}
    </BaseButton>
  );
}
