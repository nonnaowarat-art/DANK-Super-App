import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function isAdmin(): Promise<boolean> {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) return false;

  // Allowlist via env (comma-separated), works even before DB roles are set
  const allowed = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  if (allowed.includes(email.toLowerCase())) return true;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    return user?.role === "ADMIN";
  } catch {
    return false;
  }
}

export interface DashboardStats {
  todayRevenue: number;
  monthRevenue: number;
  todayOrders: number;
  monthOrders: number;
  totalCustomers: number;
  avgOrderValue: number;
  revenueByCategory: { category: string; revenue: number }[];
  topProducts: { name: string; qty: number; revenue: number }[];
  lowStock: { name: string; stock: number }[];
  dailySales: { date: string; revenue: number }[];
  recentOrders: {
    id: string;
    customerName: string;
    total: number;
    status: string;
    fulfillment: string;
    createdAt: string;
  }[];
  demo: boolean;
}

const DEMO_STATS: DashboardStats = {
  todayRevenue: 18450,
  monthRevenue: 412800,
  todayOrders: 23,
  monthOrders: 489,
  totalCustomers: 1284,
  avgOrderValue: 844,
  revenueByCategory: [
    { category: "Flower", revenue: 268320 },
    { category: "Vapes", revenue: 74300 },
    { category: "Edibles", revenue: 41280 },
    { category: "Concentrates", revenue: 20640 },
    { category: "Accessories", revenue: 8260 },
  ],
  topProducts: [
    { name: "EXO - RED HOT (Hybrid) THC 29-30%", qty: 142, revenue: 56800 },
    { name: "SuperExo - Pineapple Express THC 60%", qty: 87, revenue: 39150 },
    { name: "Topshelf - King Cherry (Hybrid) THC 28%", qty: 116, revenue: 34800 },
    { name: "Mid Grade - Superboof (Hybrid)", qty: 154, revenue: 30800 },
    { name: "ACE ULTRA Disposable Vape 2000mg", qty: 14, revenue: 28000 },
  ],
  lowStock: [
    { name: "SuperExo - Pineapple Express THC 60%", stock: 4 },
    { name: "Gummies 500mg", stock: 7 },
  ],
  dailySales: Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    return {
      date: d.toISOString().slice(5, 10),
      revenue: 9000 + Math.round(Math.sin(i / 2) * 4000 + (i % 5) * 1500),
    };
  }),
  recentOrders: [
    { id: "demo1", customerName: "Som", total: 1200, status: "PENDING", fulfillment: "DELIVERY", createdAt: new Date().toISOString() },
    { id: "demo2", customerName: "Alex", total: 450, status: "COMPLETED", fulfillment: "PICKUP", createdAt: new Date().toISOString() },
    { id: "demo3", customerName: "Nina", total: 2700, status: "COMPLETED", fulfillment: "DELIVERY", createdAt: new Date().toISOString() },
  ],
  demo: true,
};

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const start14d = new Date(now.getTime() - 13 * 24 * 60 * 60 * 1000);

    const [todayOrders, monthOrders, totalCustomers, recentOrdersRaw, items, lowStockRaw] =
      await Promise.all([
        prisma.order.findMany({ where: { createdAt: { gte: startOfDay } } }),
        prisma.order.findMany({ where: { createdAt: { gte: startOfMonth } } }),
        prisma.user.count(),
        prisma.order.findMany({
          orderBy: { createdAt: "desc" },
          take: 10,
        }),
        prisma.orderItem.findMany({
          where: { order: { createdAt: { gte: startOfMonth } } },
          include: { product: { select: { category: true } } },
        }),
        prisma.product.findMany({
          where: { stock: { lte: 10 } },
          orderBy: { stock: "asc" },
          take: 10,
          select: { name: true, stock: true },
        }),
      ]);

    const last14 = await prisma.order.findMany({
      where: { createdAt: { gte: start14d } },
      select: { total: true, createdAt: true },
    });

    const dailyMap = new Map<string, number>();
    for (let i = 0; i < 14; i++) {
      const d = new Date(start14d.getTime() + i * 24 * 60 * 60 * 1000);
      dailyMap.set(d.toISOString().slice(5, 10), 0);
    }
    for (const o of last14) {
      const key = o.createdAt.toISOString().slice(5, 10);
      dailyMap.set(key, (dailyMap.get(key) ?? 0) + o.total);
    }

    const catMap = new Map<string, number>();
    const prodMap = new Map<string, { qty: number; revenue: number }>();
    for (const it of items) {
      const cat = it.product?.category ?? "Other";
      catMap.set(cat, (catMap.get(cat) ?? 0) + it.price * it.quantity);
      const p = prodMap.get(it.name) ?? { qty: 0, revenue: 0 };
      p.qty += it.quantity;
      p.revenue += it.price * it.quantity;
      prodMap.set(it.name, p);
    }

    const monthRevenue = monthOrders.reduce((s, o) => s + o.total, 0);

    return {
      todayRevenue: todayOrders.reduce((s, o) => s + o.total, 0),
      monthRevenue,
      todayOrders: todayOrders.length,
      monthOrders: monthOrders.length,
      totalCustomers,
      avgOrderValue: monthOrders.length ? Math.round(monthRevenue / monthOrders.length) : 0,
      revenueByCategory: Array.from(catMap.entries())
        .map(([category, revenue]) => ({ category, revenue }))
        .sort((a, b) => b.revenue - a.revenue),
      topProducts: Array.from(prodMap.entries())
        .map(([name, v]) => ({ name, ...v }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5),
      lowStock: lowStockRaw,
      dailySales: Array.from(dailyMap.entries()).map(([date, revenue]) => ({ date, revenue })),
      recentOrders: recentOrdersRaw.map((o) => ({
        id: o.id,
        customerName: o.customerName,
        total: o.total,
        status: o.status,
        fulfillment: o.fulfillment,
        createdAt: o.createdAt.toISOString(),
      })),
      demo: false,
    };
  } catch {
    return DEMO_STATS;
  }
}
