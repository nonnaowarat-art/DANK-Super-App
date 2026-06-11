import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getData() {
  const [groups, recentSummaries] = await Promise.all([
    prisma.lineGroup.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.groupSummary.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { group: true },
    }),
  ]);
  return { groups, recentSummaries };
}

export default async function DashboardPage() {
  const { groups, recentSummaries } = await getData();

  const stockGroups = groups.filter((g) => g.groupType === "STOCK_CHECK");
  const kpiGroups = groups.filter((g) => g.groupType === "KPI_SHIFT");

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-400">🌿 DANK Bot Dashboard</h1>
        <p className="text-gray-400 mt-1">LINE Group Chat Summaries</p>
      </div>

      {/* Connected Groups */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Link href="/dashboard/stock">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-green-500 transition-colors cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">📦</span>
              <div>
                <h2 className="font-semibold text-white">Stock Check Daily</h2>
                <p className="text-xs text-gray-500">ตรวจสต็อกประจำวัน</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-green-400">{stockGroups.length}</p>
            <p className="text-xs text-gray-500">กลุ่มที่เชื่อมต่อ</p>
          </div>
        </Link>

        <Link href="/dashboard/kpi">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-blue-500 transition-colors cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">📊</span>
              <div>
                <h2 className="font-semibold text-white">Dank Club BKK</h2>
                <p className="text-xs text-gray-500">KPI Daily Shift Summary</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-blue-400">{kpiGroups.length}</p>
            <p className="text-xs text-gray-500">กลุ่มที่เชื่อมต่อ</p>
          </div>
        </Link>
      </div>

      {/* Recent Summaries */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h2 className="font-semibold text-white mb-4">สรุปล่าสุด</h2>
        {recentSummaries.length === 0 ? (
          <p className="text-gray-500 text-sm">ยังไม่มีสรุป — เพิ่มบอทเข้ากลุ่ม LINE แล้วพิมพ์ !register</p>
        ) : (
          <div className="space-y-3">
            {recentSummaries.map((s) => (
              <div key={s.id} className="border border-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    s.summaryType === "STOCK_DAILY"
                      ? "bg-green-900 text-green-300"
                      : "bg-blue-900 text-blue-300"
                  }`}>
                    {s.summaryType === "STOCK_DAILY" ? "📦 Stock" : "📊 KPI"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(s.createdAt).toLocaleString("th-TH")}
                  </span>
                </div>
                <pre className="text-xs text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">
                  {s.content}
                </pre>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Setup Instructions */}
      <div className="mt-8 bg-gray-900 border border-yellow-900 rounded-xl p-5">
        <h2 className="font-semibold text-yellow-400 mb-3">⚙️ วิธีตั้งค่า LINE Bot</h2>
        <ol className="text-sm text-gray-300 space-y-2 list-decimal list-inside">
          <li>สร้าง LINE Messaging API channel ใน LINE Developers Console</li>
          <li>ตั้งค่า Webhook URL: <code className="text-green-400 bg-gray-800 px-1 rounded">https://[your-domain]/api/line/webhook</code></li>
          <li>เพิ่ม <code className="text-green-400 bg-gray-800 px-1 rounded">LINE_CHANNEL_ACCESS_TOKEN</code> และ <code className="text-green-400 bg-gray-800 px-1 rounded">LINE_CHANNEL_SECRET</code> ใน .env</li>
          <li>เพิ่มบอทเข้ากลุ่ม Stock Check แล้วพิมพ์ <code className="text-green-400 bg-gray-800 px-1 rounded">!register stock</code></li>
          <li>เพิ่มบอทเข้ากลุ่ม Dank Club BKK แล้วพิมพ์ <code className="text-green-400 bg-gray-800 px-1 rounded">!register kpi</code></li>
        </ol>
      </div>
    </div>
  );
}
