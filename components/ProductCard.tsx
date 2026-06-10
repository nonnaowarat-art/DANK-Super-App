"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Zap } from "lucide-react";
import { Product, GRADE_COLORS, STRAIN_COLORS } from "@/lib/types";
import { useCart } from "./CartProvider";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { add } = useCart();
  const lowestVariant = product.variants.length
    ? product.variants.reduce((a, b) => (a.price < b.price ? a : b))
    : null;
  const displayPrice = lowestVariant ? lowestVariant.price : product.price;

  const gradeStyle =
    GRADE_COLORS[product.grade] ??
    "text-gray-400 bg-gray-400/10 border-gray-400/30";
  const strainStyle = product.strainType
    ? (STRAIN_COLORS[product.strainType] ?? "text-gray-400")
    : "";

  return (
    <div className="group bg-dank-card border border-dank-border rounded-2xl overflow-hidden hover:border-dank-green/40 transition-all duration-200 hover:shadow-lg hover:shadow-dank-green/5 flex flex-col">
      {/* Image */}
      <Link href={`/shop/${product.handle}`} className="block relative aspect-square overflow-hidden bg-black">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            🌿
          </div>
        )}
        {/* Grade badge */}
        {product.grade && (
          <div className="absolute top-2 left-2">
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${gradeStyle}`}
            >
              {product.grade}
            </span>
          </div>
        )}
        {product.featured && (
          <div className="absolute top-2 right-2">
            <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-dank-gold/10 border border-dank-gold/30 text-dank-gold">
              <Zap className="w-2.5 h-2.5" />
              HOT
            </span>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="p-3 flex flex-col gap-2 flex-1">
        <Link href={`/shop/${product.handle}`}>
          <h3 className="text-sm font-semibold leading-snug line-clamp-2 hover:text-dank-green transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-2 flex-wrap">
          {product.strainType && (
            <span className={`text-xs font-medium ${strainStyle}`}>
              {product.strainType}
            </span>
          )}
          {product.thc && (
            <span className="text-xs text-dank-muted">
              THC {product.thc}%
            </span>
          )}
        </div>

        {/* Price + Add */}
        <div className="flex items-center justify-between mt-auto pt-1">
          <div>
            <span className="text-xs text-dank-muted">from </span>
            <span className="text-dank-green font-bold">
              ฿{displayPrice.toLocaleString()}
            </span>
          </div>
          <button
            onClick={() => add(product, lowestVariant, 1)}
            className="flex items-center gap-1.5 bg-dank-green/10 hover:bg-dank-green hover:text-black text-dank-green text-xs font-semibold px-3 py-1.5 rounded-lg border border-dank-green/30 transition-all"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
