"use client";

import { useState } from "react";
import { ShoppingBag, Plus, Minus } from "lucide-react";
import { Product, ProductVariant } from "@/lib/types";
import { useCart } from "./CartProvider";

interface Props {
  product: Product;
}

export default function AddToCartSection({ product }: Props) {
  const { add } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants.length > 0 ? product.variants[0] : null
  );
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const price = selectedVariant ? selectedVariant.price : product.price;

  const handleAdd = () => {
    add(product, selectedVariant, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Variant selector */}
      {product.variants.length > 0 && (
        <div>
          <p className="text-xs text-dank-muted font-medium mb-2 uppercase tracking-wider">
            Select Size
          </p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedVariant(v)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  selectedVariant?.id === v.id
                    ? "border-dank-green bg-dank-green/10 text-dank-green"
                    : "border-dank-border text-gray-400 hover:border-dank-green/40 hover:text-white"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price display */}
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-black text-dank-green">
          ฿{price.toLocaleString()}
        </span>
        {selectedVariant && (
          <span className="text-sm text-dank-muted">/ {selectedVariant.label}</span>
        )}
      </div>

      {/* Qty + Add */}
      <div className="flex gap-3">
        {/* Qty */}
        <div className="flex items-center border border-dank-border rounded-xl overflow-hidden">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-10 h-12 flex items-center justify-center hover:bg-white/5 transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-10 text-center font-semibold">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="w-10 h-12 flex items-center justify-center hover:bg-white/5 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAdd}
          className={`flex-1 flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-xl transition-all ${
            added
              ? "bg-green-400 text-black"
              : "bg-dank-green hover:bg-green-400 text-black"
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          {added ? "Added!" : `Add to Cart · ฿${(price * qty).toLocaleString()}`}
        </button>
      </div>

      <p className="text-xs text-dank-muted">
        🏪 Pickup &amp; 🛵 Delivery · Open 24 hrs · Phatthanakan, Bangkok
      </p>
    </div>
  );
}
