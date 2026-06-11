import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DANK Super App",
  description: "DANK Shop Management",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className="bg-gray-950 text-gray-100 min-h-screen">{children}</body>
    </html>
  );
}
