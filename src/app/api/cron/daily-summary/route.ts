import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendAndSaveStockSummary } from "@/lib/line/stockHandler";
import { sendAndSaveKPISummary } from "@/lib/line/kpiHandler";

// Call this endpoint via a cron job (e.g., Vercel Cron, external cron service)
// Secure it with CRON_SECRET header
export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-cron-secret");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const groups = await prisma.lineGroup.findMany({ where: { isActive: true } });
  const results: { groupId: string; type: string; ok: boolean; error?: string }[] = [];

  for (const group of groups) {
    try {
      if (group.groupType === "STOCK_CHECK") {
        await sendAndSaveStockSummary(group.id, group.lineGroupId);
      } else {
        await sendAndSaveKPISummary(group.id, group.lineGroupId);
      }
      results.push({ groupId: group.lineGroupId, type: group.groupType, ok: true });
    } catch (err) {
      results.push({
        groupId: group.lineGroupId,
        type: group.groupType,
        ok: false,
        error: String(err),
      });
    }
  }

  return NextResponse.json({ results });
}
