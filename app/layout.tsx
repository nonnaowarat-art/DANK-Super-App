import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartProvider from "@/components/CartProvider";
import SessionProvider from "@/components/SessionProvider";
import BudtenderChat from "@/components/BudtenderChat";

export const metadata: Metadata = {
  title: "DANK Cannabis Club | Bangkok",
  description:
    "Premium cannabis shop in Bangkok. Super Exotic, Exotic, Top Shelf & Mid Grade flower plus edibles, vapes and concentrates.",
  keywords: "cannabis, weed, Bangkok, Thailand, DANK, CBD, THC",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-dank-dark text-white min-h-screen flex flex-col">
        <SessionProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <BudtenderChat />
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
