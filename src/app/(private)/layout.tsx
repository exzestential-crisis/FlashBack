"use client";

import Sidebar from "@/components/layout/Sidebar";
import ModalWrapper from "@/components/modals/ModalWrapper";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full">
      <Sidebar />
      {children}

      <ModalWrapper />
    </div>
  );
}
