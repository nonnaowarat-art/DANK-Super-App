import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getData() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [groups, todayEntries, summaries] = await Promise.all([
    prisma.lineGroup.findMany({ where: { groupType: "STOCK_CHECK" } }),
    prisma.stockEntry.findMany({
      where: { entryDate: { gte: today } },
      orderBy: { entryDate: "desc" },
      include: { group: true },
    }),
    prisma.groupSummary.findMany({
      where: { summaryType: "STOCK_DAILY" },
      orderBy: { createdAt: "desc" },
      take: 10,
      include: { group: true },
    }),
  ]);
  return { groups, todayEntries, summaries };
}

const statusColor: Record<string, string> = {
  OK: "text-green-400",
  LOW: "text-yellow-400",
  OUT: "text-red-400",
};
const statusEmoji: Record<string, string> = {
  OK: "🟢",
  LOW: "🟡",
  OUT: "🔴",
};

export default async function StockPage() {
  const { groups, todayEntries, summaries } = await getData();

  const grouped = todayEntries.reduce<Record<string, typeof todayEntries>>((acc, e) => {
    (acc[e.productName.toLowerCase()] ??= []).push(e);
    return acc;
  }, {});
  // Latest per product
  const latestEntries = Object.values(grouped).map((arr) => arr[0]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard" className="text-gray-500 hover:text-white text-sm">← Dashboard</Link>
        <h1 className="text-2xl font-bold text-green-400">📦 Stock Check Daily</h1>
      </div>

      {/* Groups */}
      <div className="flex flex-wrap gap-2 mb-6">
        {groups.length === 0 ? (
          <span className="text-gray-500 text-sm">ยังไม่มีกลุ่มที่ลงทะเบียน — พิมพ์ !register stock ในกลุ่ม LINE</span>
        ) : groups.map((g) => (
          <span key={g.id} className="bg-green-900 text-green-300 text-xs px-3 py-1 rounded-full">
            {g.isActive ? "🟢" : "⚫"} {g.name}
          </span>
        ))}
      </div>

      {/* Today's Stock */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
        <h2 className="font-semibold text-white mb-4">
          สต็อกวันนี้ — {new Date().toLocaleDateString("th-TH", { day: "numeric", month: "long", year: "numeric" })}
        </h2>
        {latestEntries.length === 0 ? (
          <p className="text-gray-500 text-sm">ยังไม่มีการรายงานสต็อกวันนี้</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 border-b border-gray-800">
                  <th className="text-left py-2">สินค้า</th>
                  <th className="text-right py-2">จำนวน</th>
                  <th className="text-center py-2">สถานะ</th>
                  <th className="text-left py-2">รายงานโดย</th>
                  <th className="text-right py-2">เวลา</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {latestEntries.map((e) => (
                  <tr key={e.id}>
                    <td className="py-2 font-medium">{e.productName}</td>
                    <td className={`py-2 text-right ${statusColor[e.status] ?? ""}`}>
                      {e.quantity} {e.unit}
                    </td>
                    <td className="py-2 text-center">
                      {statusEmoji[e.status]} {e.status}
                    </td>
                    <td className="py-2 text-gray-400">{e.reporterName}</td>
                    <td className="py-2 text-right text-gray-500 text-xs">
                      {new Date(e.entryDate).toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Past Summaries */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h2 className="font-semibold text-white mb-4">สรุปย้อนหลัง</h2>
        {summaries.length === 0 ? (
          <p className="text-gray-500 text-sm">ยังไม่มีสรุป — พิมพ์ !summary ในกลุ่ม LINE เพื่อสร้างสรุป</p>
        ) : (
          <div className="space-y-3">
            {summaries.map((s) => (
              <div key={s.id} className="border border-gray-800 rounded-lg p-4">
                <div className="flex justify-between mb-2 text-xs text-gray-500">
                  <span>{s.group.name}</span>
                  <span>{new Date(s.createdAt).toLocaleString("th-TH")}</span>
                </div>
                <pre className="text-xs text-gray-300 whitespace-pre-wrap font-mono">{s.content}</pre>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
