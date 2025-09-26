// src/(private)/layout.tsx
import { Metadata } from "next";
import React from "react";
import Navbar from "@/components/layout/Navbar";

export default function PrivateLayout({
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
