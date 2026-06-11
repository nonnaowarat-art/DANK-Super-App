"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "./CartProvider";
import CartDrawer from "./CartDrawer";
import { useState } from "react";

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

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-dank-border bg-dank-dark/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl font-black tracking-tight">
              <span className="text-white">DANK</span>
              <span className="text-dank-green">.</span>
            </span>
            <span className="hidden sm:block text-xs text-dank-muted tracking-widest uppercase">
              Cannabis Club
            </span>
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

          <div className="flex items-center gap-3">
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
            </nav>
          </div>
        )}
      </header>

      <CartDrawer open={isOpen} onClose={closeCart} />
    </>
  );
}
