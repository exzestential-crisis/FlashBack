import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

import NotificationContainer from "@/components/shared/NotificationContainer";

export const metadata: Metadata = {
  title: "FlashBack | Recall made simple",
  description: "A Flashcard website",
  icons: {
    icon: "/logo.svg",
  },
};

<meta name="viewport" content="width=device-width, initial-scale=1" />;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script
          src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.js"
          strategy="beforeInteractive"
        />
        <NotificationContainer />
      </body>
    </html>
  );
}
