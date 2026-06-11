import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { pushTextMessage } from "@/lib/line/client";
import { handleStockMessage, sendAndSaveStockSummary } from "@/lib/line/stockHandler";
import { handleKPIMessage, sendAndSaveKPISummary } from "@/lib/line/kpiHandler";
import {
  parseRegisterCommand,
  isSummaryCommand,
  isHelpCommand,
} from "@/lib/line/parser";

function verifySignature(body: string, signature: string): boolean {
  const secret = process.env.LINE_CHANNEL_SECRET ?? "";
  const hash = crypto.createHmac("SHA256", secret).update(body).digest("base64");
  return hash === signature;
}

const STOCK_HELP = `📦 คำสั่งกลุ่มสต็อก
─────────────────────
รายงานสต็อก:
  stock [สินค้า] [จำนวน]
  [สินค้า]: [จำนวน]
  out: [สินค้า]
  low: [สินค้า] [จำนวน]

ดูสรุป:
  !summary หรือ !สรุป`;

const KPI_HELP = `📊 คำสั่งกลุ่ม KPI
─────────────────────
รายงานกะ:
  กะเช้า @ชื่อ
  ยอดขาย 5000
  ลูกค้า 12 คน
  สินค้าขายดี: OG Kush

แบบบรรทัดเดียว:
  kpi morning @Staff sales:5000 customers:12 top:OG Kush

ดูสรุป:
  !kpi หรือ !สรุปกะ`;

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-line-signature") ?? "";

  if (!verifySignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let body: { events: LineEvent[] };
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Bad JSON" }, { status: 400 });
  }

  // Process all events (async, don't await to stay within LINE's 1s timeout)
  processEvents(body.events).catch(console.error);

  return NextResponse.json({ ok: true });
}

type LineEvent = {
  type: string;
  source: { type: string; groupId?: string; userId?: string };
  message?: { type: string; text?: string };
  replyToken?: string;
};

async function getOrNull(lineGroupId: string) {
  return prisma.lineGroup.findUnique({ where: { lineGroupId } });
}

async function processEvents(events: LineEvent[]) {
  for (const event of events) {
    try {
      await handleEvent(event);
    } catch (err) {
      console.error("Event error:", err);
    }
  }
}

async function handleEvent(event: LineEvent) {
  const { type, source } = event;

  // Only handle group events
  if (source.type !== "group" || !source.groupId) return;
  const lineGroupId = source.groupId;
  const senderId = source.userId ?? "unknown";

  // Bot joined a group
  if (type === "join") {
    await pushTextMessage(
      lineGroupId,
      `🌿 สวัสดีครับ! ผมคือ DANK Bot\n\nกรุณาลงทะเบียนกลุ่มนี้:\n  !register stock — กลุ่มตรวจสต็อก\n  !register kpi — กลุ่ม KPI Shift\n\nพิมพ์ !help เพื่อดูคำสั่งทั้งหมด`
    );
    return;
  }

  if (type !== "message" || event.message?.type !== "text") return;
  const text = event.message.text?.trim() ?? "";
  if (!text) return;

  // ── Register command ───────────────────────────────────────
  const groupType = parseRegisterCommand(text);
  if (groupType) {
    const existing = await getOrNull(lineGroupId);
    const typeName = groupType === "STOCK_CHECK" ? "ตรวจสต็อก" : "KPI Shift";
    if (existing) {
      await prisma.lineGroup.update({
        where: { id: existing.id },
        data: { groupType, isActive: true },
      });
    } else {
      await prisma.lineGroup.create({
        data: { lineGroupId, name: `กลุ่ม ${typeName}`, groupType },
      });
    }
    await pushTextMessage(
      lineGroupId,
      `✅ ลงทะเบียนเป็นกลุ่ม ${typeName} เรียบร้อยแล้ว!\nพิมพ์ !help เพื่อดูวิธีใช้งาน`
    );
    return;
  }

  const group = await getOrNull(lineGroupId);
  if (!group || !group.isActive) return;

  // ── Help command ───────────────────────────────────────────
  if (isHelpCommand(text)) {
    await pushTextMessage(
      lineGroupId,
      group.groupType === "STOCK_CHECK" ? STOCK_HELP : KPI_HELP
    );
    return;
  }

  // ── Summary command ────────────────────────────────────────
  if (isSummaryCommand(text)) {
    if (group.groupType === "STOCK_CHECK") {
      await sendAndSaveStockSummary(group.id, lineGroupId);
    } else {
      await sendAndSaveKPISummary(group.id, lineGroupId);
    }
    return;
  }

  // ── Data messages ──────────────────────────────────────────
  let senderName = `User-${senderId.slice(-4)}`;
  try {
    const client = await import("@/lib/line/client").then((m) => m.getLineClient());
    const profile = await client.getGroupMemberProfile(lineGroupId, senderId);
    senderName = profile.displayName;
  } catch {
    // Profile fetch is best-effort
  }

  if (group.groupType === "STOCK_CHECK") {
    await handleStockMessage(group.id, lineGroupId, senderId, senderName, text);
  } else {
    await handleKPIMessage(group.id, lineGroupId, senderId, senderName, text);
  }
}
