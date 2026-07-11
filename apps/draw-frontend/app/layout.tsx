import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Draw-App",
  description: "Collaborative drawing, diagrams, and whiteboards for modern teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body>{children}</body>
    </html>
  );
}
