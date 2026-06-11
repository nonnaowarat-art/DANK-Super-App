import { NextResponse } from "next/server";
import { isAdmin, getDashboardStats } from "@/lib/admin";
import { getAnthropic, AI_MODEL } from "@/lib/anthropic";

export const maxDuration = 120;

export async function POST() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stats = await getDashboardStats();
  const client = getAnthropic();

  if (!client) {
    // Rule-based fallback when no API key is configured
    const insights: string[] = [];
    if (stats.lowStock.length > 0) {
      insights.push(
        `🔴 Restock alert: ${stats.lowStock.map((p) => `${p.name} (${p.stock} left)`).join(", ")}.`
      );
    }
    if (stats.topProducts[0]) {
      insights.push(
        `🔥 Best seller this month: ${stats.topProducts[0].name} — ฿${stats.topProducts[0].revenue.toLocaleString()}. Keep it stocked and featured.`
      );
    }
    if (stats.revenueByCategory[0]) {
      insights.push(
        `📊 ${stats.revenueByCategory[0].category} drives the most revenue (฿${stats.revenueByCategory[0].revenue.toLocaleString()} this month).`
      );
    }
    insights.push(
      "🤖 Connect an ANTHROPIC_API_KEY to unlock full AI analysis with pricing, promotion and trend recommendations."
    );
    return NextResponse.json({ insights: insights.join("\n\n"), ai: false });
  }

  const dataSummary = JSON.stringify(
    {
      todayRevenue: stats.todayRevenue,
      monthRevenue: stats.monthRevenue,
      todayOrders: stats.todayOrders,
      monthOrders: stats.monthOrders,
      totalCustomers: stats.totalCustomers,
      avgOrderValue: stats.avgOrderValue,
      revenueByCategory: stats.revenueByCategory,
      topProducts: stats.topProducts,
      lowStock: stats.lowStock,
      last14DaysSales: stats.dailySales,
    },
    null,
    2
  );

  const stream = client.messages.stream({
    model: AI_MODEL,
    max_tokens: 2048,
    thinking: { type: "adaptive" },
    system:
      "You are the AI business analyst for DANK Cannabis Club, a 24-hour cannabis shop and bar in Bangkok (pickup + delivery). " +
      "Grades sold: Super Exotic, Exotic, Top Shelf, Mid Grade, plus edibles, vapes, concentrates, accessories. " +
      "Loyalty: ฿100 = 1 point, 20 points = 1 free gram. " +
      "Analyze the sales data and write concise, actionable insights for the owner. " +
      "Structure: 1) Quick health summary (1-2 sentences), 2) What to restock, 3) What to promote and why, " +
      "4) Pricing or promo suggestions, 5) One growth idea. " +
      "Use ฿ for currency, emoji section markers, and keep the whole thing under 300 words. Be specific — name actual products from the data.",
    messages: [
      {
        role: "user",
        content: `Here is this month's data:\n\n${dataSummary}\n\nGive me your insights.`,
      },
    ],
  });

  const message = await stream.finalMessage();
  let text = "";
  for (const block of message.content) {
    if (block.type === "text") text += block.text;
  }

  return NextResponse.json({ insights: text, ai: true });
}
