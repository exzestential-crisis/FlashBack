"use client";

import { useState, useEffect } from "react";

export function useIsDesktop(breakpoint = 640) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    function checkScreen() {
      setIsDesktop(window.innerWidth >= breakpoint);
    }

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, [breakpoint]);

  return isDesktop;
}
