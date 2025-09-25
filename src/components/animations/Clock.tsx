"use client";

import dynamic from "next/dynamic";

const DotLottieReact = dynamic(
  () =>
    import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false } // <- disables server-side rendering
);

export default function Clock() {
  return (
    <div className="w-[455px] h-[400px]">
      <DotLottieReact
        src="https://lottie.host/5ca0c57e-ec60-438c-b94c-ff5dca7cc5f7/mXGXkFSIGV.lottie"
        loop
        autoplay
      />
    </div>
  );
}
