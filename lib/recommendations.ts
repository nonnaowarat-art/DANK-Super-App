import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Product } from "@/lib/types";

/**
 * "Picked for you" — looks at the logged-in user's order history and
 * recommends products matching their favorite categories/strains/grades
 * that they haven't bought yet.
 */
export async function getPersonalRecommendations(): Promise<{
  name: string | null;
  products: Product[];
}> {
  const empty = { name: null, products: [] as Product[] };
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) return empty;

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        orders: {
          include: { items: { include: { product: true } } },
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    });
    if (!user || user.orders.length === 0) return empty;

    // Score user's taste from past purchases
    const catScore = new Map<string, number>();
    const strainScore = new Map<string, number>();
    const gradeScore = new Map<string, number>();
    const boughtIds = new Set<string>();

    for (const order of user.orders) {
      for (const item of order.items) {
        const p = item.product;
        if (!p) continue;
        boughtIds.add(p.id);
        catScore.set(p.category, (catScore.get(p.category) ?? 0) + item.quantity);
        if (p.strainType)
          strainScore.set(p.strainType, (strainScore.get(p.strainType) ?? 0) + item.quantity);
        if (p.grade) gradeScore.set(p.grade, (gradeScore.get(p.grade) ?? 0) + item.quantity);
      }
    }

    const candidates = await prisma.product.findMany({
      where: { id: { notIn: Array.from(boughtIds) } },
      include: { variants: true },
    });

    const scored = candidates
      .map((p) => {
        let score = 0;
        score += (catScore.get(p.category) ?? 0) * 3;
        if (p.strainType) score += (strainScore.get(p.strainType) ?? 0) * 2;
        if (p.grade) score += (gradeScore.get(p.grade) ?? 0) * 2;
        if (p.featured) score += 1;
        return { p, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);

    return {
      name: user.name,
      products: scored.map((x) => x.p) as unknown as Product[],
    };
  } catch {
    return empty;
  }
}
