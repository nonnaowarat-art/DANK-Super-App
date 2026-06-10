import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import FilterBar from "@/components/FilterBar";
import { Product } from "@/lib/types";

interface PageProps {
  searchParams: {
    category?: string;
    grade?: string;
    strain?: string;
    sort?: string;
    page?: string;
  };
}

const PAGE_SIZE = 24;

async function getProducts(searchParams: PageProps["searchParams"]) {
  const { category, grade, strain, sort, page: pageStr } = searchParams;
  const page = parseInt(pageStr ?? "1");

  const where: Record<string, unknown> = {};
  if (category) where.category = category;
  if (grade) where.grade = grade;
  if (strain) where.strainType = strain;

  let orderBy: Record<string, string> = { createdAt: "desc" };
  if (sort === "price_asc") orderBy = { price: "asc" };
  else if (sort === "price_desc") orderBy = { price: "desc" };
  else if (sort === "thc_desc") orderBy = { thc: "desc" };
  else if (sort === "name_asc") orderBy = { name: "asc" };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: { variants: true },
    }),
    prisma.product.count({ where }),
  ]);

  return { products: products as unknown as Product[], total, page };
}

export default async function ShopPage({ searchParams }: PageProps) {
  const { products, total, page } = await getProducts(searchParams);
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const heading = searchParams.category
    ? searchParams.grade
      ? `${searchParams.grade} ${searchParams.category}`
      : searchParams.category
    : searchParams.grade
    ? searchParams.grade
    : "All Products";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-3xl font-black mb-1">{heading}</h1>
        <p className="text-dank-muted text-sm">
          DANK Cannabis Club · Bangkok, Thailand
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <Suspense>
          <FilterBar total={total} />
        </Suspense>
      </div>

      {/* Grid */}
      {products.length === 0 ? (
        <div className="text-center py-24 text-dank-muted">
          <p className="text-5xl mb-4">🌿</p>
          <p className="text-lg font-medium">No products found</p>
          <p className="text-sm mt-1">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => {
            const p = new URLSearchParams(
              Object.entries(searchParams).filter(([, v]) => v) as [
                string,
                string,
              ][]
            );
            p.set("page", String(n));
            return (
              <a
                key={n}
                href={`/shop?${p.toString()}`}
                className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium border transition-colors ${
                  n === page
                    ? "bg-dank-green text-black border-dank-green"
                    : "border-dank-border text-gray-400 hover:border-dank-green/50 hover:text-white"
                }`}
              >
                {n}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
