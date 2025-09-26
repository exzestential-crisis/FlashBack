// app/layout.tsx
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

import NotificationContainer from "@/components/shared/NotificationContainer";
import { createServerSupabaseClient } from "@/utils/supabase/server";

import PublicLayout from "./(public)/layout";
import PrivateLayout from "./(private)/layout";

export const metadata: Metadata = {
  title: "FlashBack | Recall made simple",
  description: "A Flashcard website",
  icons: {
    icon: "/logo.svg",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const isLoggedIn = !!session;

  return (
    <html lang="en">
      <head>
        {/* viewport meta for responsiveness */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {isLoggedIn ? (
          <PrivateLayout>{children}</PrivateLayout>
        ) : (
          <PublicLayout>{children}</PublicLayout>
        )}

        {/* Lottie script */}
        <Script
          src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.js"
          strategy="beforeInteractive"
        />

        {/* Notifications */}
        <NotificationContainer />
      </body>
    </html>
  );
}
