"use client";

import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartProvider";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: Props) {
  const { items, total, remove, setQty } = useCart();

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-dank-card border-l border-dank-border z-50 flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-dank-border">
          <h2 className="font-bold text-lg flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-dank-green" />
            Your Cart
            {items.length > 0 && (
              <span className="text-sm text-dank-muted font-normal">
                ({items.length} item{items.length !== 1 ? "s" : ""})
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/5 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 gap-3 text-dank-muted">
              <ShoppingBag className="w-12 h-12 opacity-30" />
              <p className="text-sm">Your cart is empty</p>
              <Link
                href="/shop"
                onClick={onClose}
                className="text-dank-green text-sm hover:underline"
              >
                Browse the shop
              </Link>
            </div>
          ) : (
            items.map((item, idx) => {
              const price = item.variant ? item.variant.price : item.product.price;
              return (
                <div
                  key={idx}
                  className="flex gap-3 bg-black/30 rounded-xl p-3 border border-dank-border"
                >
                  {/* Image */}
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-dank-border">
                    {item.product.imageUrl && (
                      <Image
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-2 leading-snug">
                      {item.product.name}
                    </p>
                    {item.variant && (
                      <p className="text-xs text-dank-muted mt-0.5">
                        {item.variant.label}
                      </p>
                    )}
                    <p className="text-dank-green font-bold text-sm mt-1">
                      ฿{(price * item.quantity).toLocaleString()}
                    </p>
                  </div>

                  {/* Qty + remove */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() =>
                        remove(item.product.id, item.variant?.id)
                      }
                      className="text-dank-muted hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-1 border border-dank-border rounded-lg">
                      <button
                        onClick={() =>
                          setQty(
                            item.product.id,
                            item.variant?.id,
                            item.quantity - 1
                          )
                        }
                        className="w-7 h-7 flex items-center justify-center hover:bg-white/5 rounded-l-lg"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          setQty(
                            item.product.id,
                            item.variant?.id,
                            item.quantity + 1
                          )
                        }
                        className="w-7 h-7 flex items-center justify-center hover:bg-white/5 rounded-r-lg"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-dank-border px-5 py-5 space-y-4">
            <div className="flex justify-between text-sm text-dank-muted">
              <span>Subtotal</span>
              <span className="text-white font-semibold">
                ฿{total.toLocaleString()}
              </span>
            </div>
            <Link
              href="/cart"
              onClick={onClose}
              className="block w-full bg-dank-green hover:bg-green-400 text-black font-bold py-3 rounded-xl text-center transition-colors"
            >
              Checkout — ฿{total.toLocaleString()}
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
