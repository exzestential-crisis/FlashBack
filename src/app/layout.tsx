import type { Metadata } from "next";
import "./globals.css";

import NotificationContainer from "@/components/shared/NotificationContainer";

export const metadata: Metadata = {
  title: "FlashBack | Recall made simple",
  description: "A Flashcard website",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <NotificationContainer />
      </body>
    </html>
  );
}
