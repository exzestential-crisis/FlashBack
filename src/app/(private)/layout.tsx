"use client";

import Sidebar from "@/components/layout/Sidebar";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full">
      <Sidebar />
      {children}
    </div>
  );
}
