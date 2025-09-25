import { KeyboardEvent, RefObject } from "react";

type UseHandleEnterPressOptions<T extends HTMLElement = HTMLElement> = {
  onSubmit: () => void | Promise<void>;
  nextRef?: RefObject<T | null>; // Allow null in the ref type
  enableWhen?: boolean;
};

export function useHandleEnterPress<T extends HTMLElement = HTMLElement>({
  onSubmit,
  nextRef,
  enableWhen = true,
}: UseHandleEnterPressOptions<T>) {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (enableWhen && e.key === "Enter") {
      e.preventDefault();
      if (nextRef?.current) {
        nextRef.current.focus();
      } else {
        onSubmit();
      }
    }
  };

  return handleKeyPress;
}
