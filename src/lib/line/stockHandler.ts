import { prisma } from "@/lib/prisma";
import { pushTextMessage } from "@/lib/line/client";
import { parseStockMessage } from "@/lib/line/parser";

export async function handleStockMessage(
  groupDbId: string,
  lineGroupId: string,
  senderId: string,
  senderName: string,
  text: string
) {
  const entry = parseStockMessage(text);
  if (!entry) return false;

  await prisma.stockEntry.create({
    data: {
      groupId: groupDbId,
      productName: entry.productName,
      quantity: entry.quantity,
      unit: entry.unit,
      status: entry.status,
      notes: entry.notes,
      reportedBy: senderId,
      reporterName: senderName,
    },
  });

  const emoji = entry.status === "OUT" ? "❌" : entry.status === "LOW" ? "⚠️" : "✅";
  await pushTextMessage(
    lineGroupId,
    `${emoji} บันทึกแล้ว: ${entry.productName} ${entry.quantity} ${entry.unit}`
  );
  return true;
}

export async function generateStockSummary(groupDbId: string): Promise<string> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const entries = await prisma.stockEntry.findMany({
    where: { groupId: groupDbId, entryDate: { gte: today } },
    orderBy: { entryDate: "asc" },
  });

  if (entries.length === 0) {
    return "📦 ยังไม่มีข้อมูลสต็อกสำหรับวันนี้\n\nวิธีรายงาน:\nstock [ชื่อสินค้า] [จำนวน]\nout: [ชื่อสินค้า]\nlow: [ชื่อสินค้า] [จำนวน]";
  }

  // Deduplicate — keep latest entry per product
  const latestByProduct = new Map<string, (typeof entries)[0]>();
  for (const e of entries) {
    latestByProduct.set(e.productName.toLowerCase(), e);
  }
  const latest = Array.from(latestByProduct.values());

  const ok = latest.filter((e) => e.status === "OK");
  const low = latest.filter((e) => e.status === "LOW");
  const out = latest.filter((e) => e.status === "OUT");

  const dateStr = today.toLocaleDateString("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  let msg = `📦 รายงานสต็อกประจำวัน\n📅 ${dateStr}\n${"─".repeat(24)}\n`;

  if (ok.length > 0) {
    msg += `\n🟢 ปกติ (${ok.length} รายการ):\n`;
    msg += ok.map((e) => `  • ${e.productName}: ${e.quantity} ${e.unit}`).join("\n");
  }
  if (low.length > 0) {
    msg += `\n\n🟡 สต็อกน้อย (${low.length} รายการ):\n`;
    msg += low.map((e) => `  • ${e.productName}: ${e.quantity} ${e.unit} ⚠️`).join("\n");
  }
  if (out.length > 0) {
    msg += `\n\n🔴 หมดสต็อก (${out.length} รายการ):\n`;
    msg += out.map((e) => `  • ${e.productName} ❌`).join("\n");
  }

  msg += `\n\n${"─".repeat(24)}\nอัพเดทล่าสุด: ${new Date().toLocaleTimeString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  return msg;
}

export async function sendAndSaveStockSummary(
  groupDbId: string,
  lineGroupId: string
) {
  const content = await generateStockSummary(groupDbId);
  await pushTextMessage(lineGroupId, content);
  await prisma.groupSummary.create({
    data: {
      groupId: groupDbId,
      summaryType: "STOCK_DAILY",
      summaryDate: new Date(),
      content,
      sentToLine: true,
    },
  });
}
