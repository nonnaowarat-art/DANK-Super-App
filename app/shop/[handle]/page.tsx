import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Product, GRADE_COLORS, STRAIN_COLORS } from "@/lib/types";
import AddToCartSection from "@/components/AddToCartSection";
import ProductCard from "@/components/ProductCard";

interface Props {
  params: { handle: string };
}

async function getProduct(handle: string): Promise<Product | null> {
  const product = await prisma.product.findUnique({
    where: { handle },
    include: { variants: true },
  });
  return product as unknown as Product | null;
}

async function getRelated(
  category: string,
  grade: string,
  currentId: string
): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: {
      OR: [{ grade }, { category }],
      NOT: { id: currentId },
    },
    take: 4,
    orderBy: { thc: "desc" },
    include: { variants: true },
  });
  return products as unknown as Product[];
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.handle);
  if (!product) notFound();

  const related = await getRelated(
    product.category,
    product.grade,
    product.id
  );

  const gradeStyle =
    GRADE_COLORS[product.grade] ??
    "text-gray-400 bg-gray-400/10 border-gray-400/30";
  const strainStyle = product.strainType
    ? (STRAIN_COLORS[product.strainType] ?? "text-gray-400")
    : "";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8 text-sm text-dank-muted">
        <Link href="/shop" className="flex items-center gap-1.5 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Shop
        </Link>
        {product.category && (
          <>
            <span>/</span>
            <Link
              href={`/shop?category=${product.category}`}
              className="hover:text-white transition-colors"
            >
              {product.category}
            </Link>
          </>
        )}
        {product.grade && (
          <>
            <span>/</span>
            <Link
              href={`/shop?grade=${encodeURIComponent(product.grade)}`}
              className="hover:text-white transition-colors"
            >
              {product.grade}
            </Link>
          </>
        )}
      </div>

      {/* Product detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
        {/* Image */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-dank-card border border-dank-border">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl">
              🌿
            </div>
          )}
          {product.grade && (
            <div className="absolute top-4 left-4">
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full border ${gradeStyle}`}
              >
                {product.grade}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black leading-tight mb-3">
              {product.name}
            </h1>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.strainType && (
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 ${strainStyle}`}
                >
                  {product.strainType}
                </span>
              )}
              {product.thc && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white">
                  THC {product.thc}%
                </span>
              )}
              {product.cbd && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white">
                  CBD {product.cbd}%
                </span>
              )}
            </div>

            <p className="text-gray-300 leading-relaxed text-sm">
              {product.description}
            </p>
          </div>

          {/* Variants / Add to cart */}
          <AddToCartSection product={product} />

          {/* Tags */}
          {product.tags && (
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-dank-border">
              {product.tags
                .split(",")
                .filter(Boolean)
                .map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] text-dank-muted bg-white/5 px-2 py-0.5 rounded-md"
                  >
                    #{tag.trim()}
                  </span>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-5">You might also like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
