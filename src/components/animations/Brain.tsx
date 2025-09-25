"use client";

import dynamic from "next/dynamic";

const DotLottieReact = dynamic(
  () =>
    import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false } // <- disables server-side rendering
);

export default function Brain() {
  return (
    <div className="w-[455px] h-[400px]">
      <DotLottieReact
        src="https://lottie.host/63e4c51e-03b2-4437-8c07-b979f42d1ca6/3iayU0QJ4Y.lottie"
        loop
        autoplay
      />
    </div>
  );
}
