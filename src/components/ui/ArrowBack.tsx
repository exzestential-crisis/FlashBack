"use client";

import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";

type Type = {
  defaultBack?: boolean;
};

export default function ArrowBack({ defaultBack = false }: Type) {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="text-4xl text-black/30 dark:text-white/70 cursor-pointer">
      {defaultBack ? (
        <IoArrowBackOutline onClick={handleBackClick} />
      ) : (
        <IoArrowBackOutline />
      )}
    </div>
  );
}
