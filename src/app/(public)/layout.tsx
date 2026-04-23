import React from "react";
import Navbar from "@/components/layout/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="signup-layout">
      <Navbar />
      {children}
    </div>
  );
}
