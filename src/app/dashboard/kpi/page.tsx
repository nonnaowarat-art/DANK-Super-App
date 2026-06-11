import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { shiftTypeLabel } from "@/lib/line/parser";

export const dynamic = "force-dynamic";

async function getData() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [groups, todayShifts, summaries] = await Promise.all([
    prisma.lineGroup.findMany({ where: { groupType: "KPI_SHIFT" } }),
    prisma.shiftKPI.findMany({
      where: { shiftDate: { gte: today } },
      orderBy: { createdAt: "asc" },
      include: { group: true },
    }),
    prisma.groupSummary.findMany({
      where: { summaryType: "KPI_SHIFT" },
      orderBy: { createdAt: "desc" },
      take: 10,
      include: { group: true },
    }),
  ]);
  return { groups, todayShifts, summaries };
}

export default async function KPIPage() {
  const { groups, todayShifts, summaries } = await getData();

  const totalSales = todayShifts.reduce((s, k) => s + k.totalSales, 0);
  const totalCustomers = todayShifts.reduce((s, k) => s + k.customerCount, 0);
  const avgPerCustomer = totalCustomers > 0 ? Math.round(totalSales / totalCustomers) : 0;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard" className="text-gray-500 hover:text-white text-sm">← Dashboard</Link>
        <h1 className="text-2xl font-bold text-blue-400">📊 Dank Club BKK — KPI</h1>
      </div>

      {/* Groups */}
      <div className="flex flex-wrap gap-2 mb-6">
        {groups.length === 0 ? (
          <span className="text-gray-500 text-sm">ยังไม่มีกลุ่มที่ลงทะเบียน — พิมพ์ !register kpi ในกลุ่ม LINE</span>
        ) : groups.map((g) => (
          <span key={g.id} className="bg-blue-900 text-blue-300 text-xs px-3 py-1 rounded-full">
            {g.isActive ? "🟢" : "⚫"} {g.name}
          </span>
        ))}
      </div>

      {/* Today totals */}
      {todayShifts.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">ยอดขายรวม</p>
            <p className="text-xl font-bold text-blue-400">{totalSales.toLocaleString()}</p>
            <p className="text-xs text-gray-500">บาท</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">ลูกค้าทั้งหมด</p>
            <p className="text-xl font-bold text-blue-400">{totalCustomers}</p>
            <p className="text-xs text-gray-500">คน</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">ค่าเฉลี่ย/คน</p>
            <p className="text-xl font-bold text-blue-400">{avgPerCustomer.toLocaleString()}</p>
            <p className="text-xs text-gray-500">บาท</p>
          </div>
        </div>
      )}

      {/* Today's Shifts */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
        <h2 className="font-semibold text-white mb-4">
          กะวันนี้ — {new Date().toLocaleDateString("th-TH", { day: "numeric", month: "long", year: "numeric" })}
        </h2>
        {todayShifts.length === 0 ? (
          <p className="text-gray-500 text-sm">ยังไม่มีการรายงาน KPI วันนี้</p>
        ) : (
          <div className="space-y-3">
            {todayShifts.map((s) => (
              <div key={s.id} className="border border-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{shiftTypeLabel(s.shiftType)}</span>
                  <span className="text-gray-400 text-sm">👤 {s.staffName}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>💰 ยอดขาย: <span className="text-blue-400 font-medium">{s.totalSales.toLocaleString()} บาท</span></div>
                  <div>👥 ลูกค้า: <span className="text-blue-400 font-medium">{s.customerCount} คน</span></div>
                  {s.topProducts && (
                    <div className="col-span-2">🏆 ขายดี: <span className="text-yellow-400">{s.topProducts}</span></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Past Summaries */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h2 className="font-semibold text-white mb-4">สรุปย้อนหลัง</h2>
        {summaries.length === 0 ? (
          <p className="text-gray-500 text-sm">ยังไม่มีสรุป — พิมพ์ !kpi ในกลุ่ม LINE เพื่อสร้างสรุป</p>
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
