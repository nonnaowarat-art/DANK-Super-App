import { prisma } from "@/lib/prisma";
import { pushTextMessage } from "@/lib/line/client";
import { parseKPIMessage, shiftTypeLabel } from "@/lib/line/parser";

export async function handleKPIMessage(
  groupDbId: string,
  lineGroupId: string,
  senderId: string,
  senderName: string,
  text: string
) {
  const parsed = parseKPIMessage(text);
  if (!parsed) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Upsert: if same staff already reported this shift today, update it
  const existing = await prisma.shiftKPI.findFirst({
    where: {
      groupId: groupDbId,
      staffName: parsed.staffName ?? senderName,
      shiftType: parsed.shiftType ?? "GENERAL",
      shiftDate: { gte: today },
    },
  });

  if (existing) {
    await prisma.shiftKPI.update({
      where: { id: existing.id },
      data: {
        totalSales: parsed.totalSales ?? existing.totalSales,
        customerCount: parsed.customerCount ?? existing.customerCount,
        topProducts: parsed.topProducts ?? existing.topProducts,
        rawMessage: text,
      },
    });
  } else {
    await prisma.shiftKPI.create({
      data: {
        groupId: groupDbId,
        shiftDate: new Date(),
        shiftType: parsed.shiftType ?? "GENERAL",
        staffName: parsed.staffName ?? senderName,
        totalSales: parsed.totalSales ?? 0,
        customerCount: parsed.customerCount ?? 0,
        topProducts: parsed.topProducts ?? "",
        rawMessage: text,
      },
    });
  }

  const label = shiftTypeLabel(parsed.shiftType ?? "GENERAL");
  const parts: string[] = [`✅ บันทึก KPI ${label}`];
  if (parsed.staffName) parts.push(`👤 ${parsed.staffName}`);
  if (parsed.totalSales) parts.push(`💰 ${parsed.totalSales.toLocaleString()} บาท`);
  if (parsed.customerCount) parts.push(`👥 ${parsed.customerCount} คน`);
  if (parsed.topProducts) parts.push(`🏆 ${parsed.topProducts}`);

  await pushTextMessage(lineGroupId, parts.join("\n"));
  return true;
}

export async function generateKPISummary(groupDbId: string): Promise<string> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const shifts = await prisma.shiftKPI.findMany({
    where: { groupId: groupDbId, shiftDate: { gte: today } },
    orderBy: { createdAt: "asc" },
  });

  const dateStr = today.toLocaleDateString("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (shifts.length === 0) {
    return `📊 ยังไม่มีข้อมูล KPI วันนี้\n\nวิธีรายงาน:\nกะเช้า @ชื่อ\nยอดขาย 5000\nลูกค้า 12 คน\nสินค้าขายดี: OG Kush\n\nหรือแบบบรรทัดเดียว:\nkpi morning @Staff sales:5000 customers:12`;
  }

  let totalSales = 0;
  let totalCustomers = 0;
  let msg = `📊 สรุป KPI ประจำวัน\n📅 ${dateStr}\n${"─".repeat(24)}\n`;

  const shiftOrder = ["MORNING", "AFTERNOON", "NIGHT", "GENERAL"];
  const sorted = [...shifts].sort(
    (a, b) => shiftOrder.indexOf(a.shiftType) - shiftOrder.indexOf(b.shiftType)
  );

  for (const s of sorted) {
    totalSales += s.totalSales;
    totalCustomers += s.customerCount;
    msg += `\n${shiftTypeLabel(s.shiftType)} — ${s.staffName}\n`;
    msg += `  💰 ยอดขาย: ${s.totalSales.toLocaleString()} บาท\n`;
    msg += `  👥 ลูกค้า: ${s.customerCount} คน`;
    if (s.topProducts) msg += `\n  🏆 ขายดี: ${s.topProducts}`;
    msg += "\n";
  }

  msg += `\n${"─".repeat(24)}\n`;
  msg += `💰 รวมยอดวันนี้: ${totalSales.toLocaleString()} บาท\n`;
  msg += `👥 ลูกค้าทั้งหมด: ${totalCustomers} คน`;

  if (totalCustomers > 0) {
    const avgSales = Math.round(totalSales / totalCustomers);
    msg += `\n💡 ค่าเฉลี่ย/คน: ${avgSales.toLocaleString()} บาท`;
  }

  return msg;
}

export async function sendAndSaveKPISummary(
  groupDbId: string,
  lineGroupId: string
) {
  const content = await generateKPISummary(groupDbId);
  await pushTextMessage(lineGroupId, content);
  await prisma.groupSummary.create({
    data: {
      groupId: groupDbId,
      summaryType: "KPI_SHIFT",
      summaryDate: new Date(),
      content,
      sentToLine: true,
    },
  });
}
