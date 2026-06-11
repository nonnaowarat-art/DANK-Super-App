import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const category = searchParams.get("category") ?? "";
  const grade = searchParams.get("grade") ?? "";
  const strain = searchParams.get("strain") ?? "";
  const sort = searchParams.get("sort") ?? "";
  const featured = searchParams.get("featured") === "true";
  const limit = parseInt(searchParams.get("limit") ?? "60");
  const page = parseInt(searchParams.get("page") ?? "1");

  const where: Record<string, unknown> = {};
  if (category) where.category = category;
  if (grade) where.grade = grade;
  if (strain) where.strainType = strain;
  if (featured) where.featured = true;

  let orderBy: Record<string, string> = { createdAt: "desc" };
  if (sort === "price_asc") orderBy = { price: "asc" };
  else if (sort === "price_desc") orderBy = { price: "desc" };
  else if (sort === "thc_desc") orderBy = { thc: "desc" };
  else if (sort === "name_asc") orderBy = { name: "asc" };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: { variants: true },
    }),
    prisma.product.count({ where }),
  ]);

  return NextResponse.json({ products, total, page, limit });
}
