"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ShoppingBag, Trash2, Minus, Plus, CheckCircle } from "lucide-react";
import { useCart } from "@/components/CartProvider";

interface FormData {
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export default function CartPage() {
  const { items, total, remove, setQty, clear } = useCart();
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!items.length) return;
    setLoading(true);
    setError("");

    try {
      const orderItems = items.map((i) => ({
        productId: i.product.id,
        name: i.product.name,
        price: i.variant ? i.variant.price : i.product.price,
        quantity: i.quantity,
        variant: i.variant?.label ?? "",
      }));

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.name,
          email: form.email,
          phone: form.phone,
          notes: form.notes,
          items: orderItems,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Something went wrong");
        return;
      }

      clear();
      setSuccess(true);
    } catch {
      setError("Network error — please try again");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <CheckCircle className="w-16 h-16 text-dank-green mx-auto mb-4" />
        <h1 className="text-2xl font-black mb-2">Order Placed!</h1>
        <p className="text-gray-400 mb-2">
          Thanks for your order. We&apos;ll confirm via WhatsApp or LINE shortly.
        </p>
        <p className="text-sm text-dank-muted mb-8">
          Pick up at DANK Cannabis Club · Bangkok
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-dank-green hover:bg-green-400 text-black font-bold px-6 py-3 rounded-xl transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/shop"
          className="flex items-center gap-1.5 text-sm text-dank-muted hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to shop
        </Link>
        <span className="text-dank-border">/</span>
        <h1 className="text-2xl font-black">Cart</h1>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-24 text-dank-muted">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <p className="text-xl font-semibold mb-2">Your cart is empty</p>
          <Link
            href="/shop"
            className="text-dank-green hover:underline text-sm"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, idx) => {
              const price = item.variant
                ? item.variant.price
                : item.product.price;
              return (
                <div
                  key={idx}
                  className="flex gap-4 bg-dank-card border border-dank-border rounded-2xl p-4"
                >
                  {/* Image */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-black">
                    {item.product.imageUrl && (
                      <Image
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/shop/${item.product.handle}`}
                      className="font-semibold text-sm hover:text-dank-green transition-colors line-clamp-2"
                    >
                      {item.product.name}
                    </Link>
                    {item.variant && (
                      <p className="text-xs text-dank-muted mt-0.5">
                        {item.variant.label}
                      </p>
                    )}
                    <p className="text-dank-green font-bold mt-1">
                      ฿{(price * item.quantity).toLocaleString()}
                    </p>
                  </div>

                  {/* Controls */}
                  <div className="flex flex-col items-end justify-between shrink-0">
                    <button
                      onClick={() =>
                        remove(item.product.id, item.variant?.id)
                      }
                      className="text-dank-muted hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="flex items-center border border-dank-border rounded-lg overflow-hidden">
                      <button
                        onClick={() =>
                          setQty(
                            item.product.id,
                            item.variant?.id,
                            item.quantity - 1
                          )
                        }
                        className="w-8 h-8 flex items-center justify-center hover:bg-white/5"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm">
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
                        className="w-8 h-8 flex items-center justify-center hover:bg-white/5"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary + form */}
          <div className="space-y-4">
            {/* Order summary */}
            <div className="bg-dank-card border border-dank-border rounded-2xl p-5">
              <h2 className="font-bold text-base mb-4">Order Summary</h2>
              <div className="space-y-2 text-sm mb-4">
                {items.map((item, idx) => {
                  const p = item.variant
                    ? item.variant.price
                    : item.product.price;
                  return (
                    <div key={idx} className="flex justify-between text-dank-muted">
                      <span className="truncate max-w-[160px]">
                        {item.product.name}{" "}
                        {item.quantity > 1 && `×${item.quantity}`}
                      </span>
                      <span className="text-white shrink-0">
                        ฿{(p * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-dank-border pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span className="text-dank-green text-lg">
                  ฿{total.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-dank-muted mt-2">
                Pay on pickup · No online payment required
              </p>
            </div>

            {/* Customer form */}
            <div className="bg-dank-card border border-dank-border rounded-2xl p-5">
              <h2 className="font-bold text-base mb-4">Your Details</h2>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="text-xs text-dank-muted block mb-1">
                    Full Name *
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    placeholder="Your name"
                    className="w-full bg-black border border-dank-border rounded-xl px-3 py-2.5 text-sm text-white placeholder-dank-muted focus:border-dank-green outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-dank-muted block mb-1">
                    Email *
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    placeholder="your@email.com"
                    className="w-full bg-black border border-dank-border rounded-xl px-3 py-2.5 text-sm text-white placeholder-dank-muted focus:border-dank-green outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-dank-muted block mb-1">
                    Phone / LINE *
                  </label>
                  <input
                    required
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value }))
                    }
                    placeholder="+66 8X XXX XXXX"
                    className="w-full bg-black border border-dank-border rounded-xl px-3 py-2.5 text-sm text-white placeholder-dank-muted focus:border-dank-green outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-dank-muted block mb-1">
                    Notes (optional)
                  </label>
                  <textarea
                    rows={2}
                    value={form.notes}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, notes: e.target.value }))
                    }
                    placeholder="Special requests..."
                    className="w-full bg-black border border-dank-border rounded-xl px-3 py-2.5 text-sm text-white placeholder-dank-muted focus:border-dank-green outline-none transition-colors resize-none"
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-xs">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-dank-green hover:bg-green-400 disabled:opacity-50 text-black font-bold py-3 rounded-xl transition-colors"
                >
                  {loading ? "Placing order..." : `Place Order · ฿${total.toLocaleString()}`}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
