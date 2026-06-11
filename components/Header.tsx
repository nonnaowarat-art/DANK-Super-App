"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X, User } from "lucide-react";
import { useCart } from "./CartProvider";
import CartDrawer from "./CartDrawer";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

const NAV = [
  { label: "Shop", href: "/shop" },
  { label: "Flower", href: "/shop?category=Flower" },
  { label: "Edibles", href: "/shop?category=Edibles" },
  { label: "Vapes", href: "/shop?category=Vapes" },
  { label: "Accessories", href: "/shop?category=Accessories" },
];

export default function Header() {
  const { count, isOpen, openCart, closeCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-dank-border bg-dank-dark/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo.png"
              alt="DANK Cannabis Club"
              width={64}
              height={64}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Account / Login */}
            {session?.user ? (
              <Link
                href="/account"
                className="flex items-center gap-1.5 p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-300 hover:text-white"
                aria-label="My account"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:block text-xs font-medium">
                  Account
                </span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-gray-300 hover:text-white border border-dank-border hover:border-white/20 px-3 py-2 rounded-lg transition-colors"
              >
                <User className="w-3.5 h-3.5" />
                Sign In
              </Link>
            )}

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative p-2 hover:bg-white/5 rounded-lg transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5 text-gray-300" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-dank-green text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </button>

            {/* Mobile menu */}
            <button
              className="md:hidden p-2 hover:bg-white/5 rounded-lg"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-dank-border bg-dank-dark">
            <nav className="flex flex-col px-4 py-3 gap-1">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {n.label}
                </Link>
              ))}
              <div className="border-t border-dank-border mt-1 pt-2">
                {session?.user ? (
                  <Link
                    href="/account"
                    onClick={() => setMobileOpen(false)}
                    className="py-2 text-sm text-dank-green hover:text-green-400 transition-colors flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    My Account
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="py-2 text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    Sign In / Register
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      <CartDrawer open={isOpen} onClose={closeCart} />
    </>
  );
}
