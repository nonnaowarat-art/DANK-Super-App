"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { CATEGORIES, GRADES, STRAINS } from "@/lib/types";
import { SlidersHorizontal, X } from "lucide-react";

export default function FilterBar({ total }: { total: number }) {
  const router = useRouter();
  const params = useSearchParams();

  const category = params.get("category") ?? "";
  const grade = params.get("grade") ?? "";
  const strain = params.get("strain") ?? "";
  const sort = params.get("sort") ?? "";

  const update = useCallback(
    (key: string, value: string) => {
      const p = new URLSearchParams(params.toString());
      if (value) {
        p.set(key, value);
      } else {
        p.delete(key);
      }
      p.delete("page");
      router.push(`/shop?${p.toString()}`);
    },
    [params, router]
  );

  const hasFilters = category || grade || strain || sort;

  const clearAll = () => router.push("/shop");

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-dank-muted">
          <SlidersHorizontal className="w-4 h-4" />
          <span>{total} products</span>
        </div>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors"
          >
            <X className="w-3 h-3" />
            Clear filters
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {/* Category */}
        <select
          value={category}
          onChange={(e) => update("category", e.target.value)}
          className="bg-dank-card border border-dank-border text-sm rounded-lg px-3 py-2 text-white focus:border-dank-green outline-none cursor-pointer"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Grade (only relevant for Flower) */}
        {(category === "Flower" || !category) && (
          <select
            value={grade}
            onChange={(e) => update("grade", e.target.value)}
            className="bg-dank-card border border-dank-border text-sm rounded-lg px-3 py-2 text-white focus:border-dank-green outline-none cursor-pointer"
          >
            <option value="">All Grades</option>
            {GRADES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        )}

        {/* Strain */}
        {(category === "Flower" || !category) && (
          <select
            value={strain}
            onChange={(e) => update("strain", e.target.value)}
            className="bg-dank-card border border-dank-border text-sm rounded-lg px-3 py-2 text-white focus:border-dank-green outline-none cursor-pointer"
          >
            <option value="">All Strains</option>
            {STRAINS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        )}

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => update("sort", e.target.value)}
          className="bg-dank-card border border-dank-border text-sm rounded-lg px-3 py-2 text-white focus:border-dank-green outline-none cursor-pointer"
        >
          <option value="">Sort: Default</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="thc_desc">THC: Highest First</option>
          <option value="name_asc">Name: A–Z</option>
        </select>
      </div>

      {/* Active filter pills */}
      {hasFilters && (
        <div className="flex flex-wrap gap-2">
          {category && (
            <Pill label={category} onRemove={() => update("category", "")} />
          )}
          {grade && (
            <Pill label={grade} onRemove={() => update("grade", "")} />
          )}
          {strain && (
            <Pill label={strain} onRemove={() => update("strain", "")} />
          )}
          {sort && (
            <Pill label={sort.replace("_", " ")} onRemove={() => update("sort", "")} />
          )}
        </div>
      )}
    </div>
  );
}

function Pill({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="flex items-center gap-1 text-xs bg-dank-green/10 border border-dank-green/30 text-dank-green px-2.5 py-1 rounded-full">
      {label}
      <button onClick={onRemove} className="hover:text-red-400 transition-colors">
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}
