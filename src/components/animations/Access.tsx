"use client";

import dynamic from "next/dynamic";

const DotLottieReact = dynamic(
  () =>
    import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false } // <- disables server-side rendering
);

export default function Access() {
  return (
    <div className="w-[455px] h-[400px]">
      <DotLottieReact
        src="https://lottie.host/533145d4-7db0-4348-b900-2de066e45d6a/WCNMFQNayj.lottie"
        loop
        autoplay
      />
    </div>
  );
}
