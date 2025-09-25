// src/app/auth/layout.tsx
import { Metadata } from "next";
import React from "react";
import Navbar from "@/components/layout/Navbar";

export default function SignupLayout({
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
