"use client";

import { useState } from "react";
import {
  TrendingUp,
  ShoppingBag,
  Users,
  Receipt,
  AlertTriangle,
  Sparkles,
  Loader2,
} from "lucide-react";
import type { DashboardStats } from "@/lib/admin";

const baht = (n: number) => `฿${Math.round(n).toLocaleString()}`;

export default function AdminDashboard({ stats }: { stats: DashboardStats }) {
  const [insights, setInsights] = useState<string | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);

  async function generateInsights() {
    setLoadingAI(true);
    try {
      const res = await fetch("/api/admin/insights", { method: "POST" });
      const data = await res.json();
      setInsights(data.insights ?? "Could not generate insights.");
    } catch {
      setInsights("Could not generate insights — please try again.");
    } finally {
      setLoadingAI(false);
    }
  }

  const maxDaily = Math.max(...stats.dailySales.map((d) => d.revenue), 1);
  const maxCat = Math.max(...stats.revenueByCategory.map((c) => c.revenue), 1);

  const kpis = [
    { label: "Today's Revenue", value: baht(stats.todayRevenue), sub: `${stats.todayOrders} orders`, icon: <TrendingUp className="w-5 h-5 text-dank-green" /> },
    { label: "Monthly Revenue", value: baht(stats.monthRevenue), sub: `${stats.monthOrders} orders`, icon: <Receipt className="w-5 h-5 text-dank-gold" /> },
    { label: "Avg Order Value", value: baht(stats.avgOrderValue), sub: "this month", icon: <ShoppingBag className="w-5 h-5 text-purple-400" /> },
    { label: "Customers", value: stats.totalCustomers.toLocaleString(), sub: "registered", icon: <Users className="w-5 h-5 text-sky-400" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-black">CEO Dashboard</h1>
          <p className="text-dank-muted text-sm">
            DANK Cannabis Club · AI-powered operations
            {stats.demo && (
              <span className="ml-2 text-dank-gold">
                (demo data — connect database for live numbers)
              </span>
            )}
          </p>
        </div>
        <button
          onClick={generateInsights}
          disabled={loadingAI}
          className="flex items-center gap-2 bg-dank-green hover:bg-green-400 disabled:opacity-50 text-black font-bold px-5 py-2.5 rounded-xl transition-colors"
        >
          {loadingAI ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          {loadingAI ? "Analyzing…" : "AI Insights"}
        </button>
      </div>

      {/* AI insights panel */}
      {insights && (
        <div className="mb-6 p-5 rounded-2xl border border-dank-green/30 bg-dank-green/5">
          <h2 className="flex items-center gap-2 font-bold mb-3 text-dank-green">
            <Sparkles className="w-4 h-4" /> AI Business Insights
          </h2>
          <div className="text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">
            {insights}
          </div>
        </div>
      )}

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {kpis.map((k) => (
          <div key={k.label} className="p-4 rounded-2xl bg-dank-card border border-dank-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-dank-muted">{k.label}</span>
              {k.icon}
            </div>
            <p className="text-2xl font-black">{k.value}</p>
            <p className="text-xs text-dank-muted mt-0.5">{k.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Sales chart */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-dank-card border border-dank-border">
          <h2 className="font-bold mb-4">Sales — last 14 days</h2>
          <div className="flex items-end gap-1.5 h-40">
            {stats.dailySales.map((d) => (
              <div key={d.date} className="flex-1 flex flex-col items-center gap-1.5">
                <div
                  className="w-full rounded-t-md bg-dank-green/70 hover:bg-dank-green transition-colors min-h-[2px]"
                  style={{ height: `${(d.revenue / maxDaily) * 100}%` }}
                  title={`${d.date}: ${baht(d.revenue)}`}
                />
                <span className="text-[9px] text-dank-muted -rotate-45 origin-center hidden sm:block">
                  {d.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue by category */}
        <div className="p-5 rounded-2xl bg-dank-card border border-dank-border">
          <h2 className="font-bold mb-4">Revenue by Category</h2>
          <div className="space-y-3">
            {stats.revenueByCategory.map((c) => (
              <div key={c.category}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300">{c.category}</span>
                  <span className="text-dank-muted">{baht(c.revenue)}</span>
                </div>
                <div className="h-2 rounded-full bg-white/5">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-dank-green to-green-300"
                    style={{ width: `${(c.revenue / maxCat) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Top products */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-dank-card border border-dank-border">
          <h2 className="font-bold mb-4">🔥 Top Selling Products</h2>
          <div className="space-y-2.5">
            {stats.topProducts.map((p, i) => (
              <div key={p.name} className="flex items-center gap-3 text-sm">
                <span className="w-6 h-6 shrink-0 flex items-center justify-center rounded-md bg-dank-green/10 text-dank-green text-xs font-bold">
                  {i + 1}
                </span>
                <span className="flex-1 text-gray-300 truncate">{p.name}</span>
                <span className="text-dank-muted text-xs">{p.qty} sold</span>
                <span className="font-semibold w-20 text-right">{baht(p.revenue)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Low stock */}
        <div className="p-5 rounded-2xl bg-dank-card border border-dank-border">
          <h2 className="flex items-center gap-2 font-bold mb-4">
            <AlertTriangle className="w-4 h-4 text-dank-gold" /> Low Stock
          </h2>
          {stats.lowStock.length === 0 ? (
            <p className="text-sm text-dank-muted">All stocked up ✅</p>
          ) : (
            <div className="space-y-2.5">
              {stats.lowStock.map((p) => (
                <div key={p.name} className="flex items-center justify-between text-sm gap-2">
                  <span className="text-gray-300 truncate">{p.name}</span>
                  <span className={`shrink-0 text-xs font-bold px-2 py-0.5 rounded-full ${p.stock <= 5 ? "bg-red-500/15 text-red-400" : "bg-dank-gold/15 text-dank-gold"}`}>
                    {p.stock} left
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent orders */}
      <div className="mt-4 p-5 rounded-2xl bg-dank-card border border-dank-border">
        <h2 className="font-bold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-dank-muted border-b border-dank-border">
                <th className="pb-2 pr-4">Customer</th>
                <th className="pb-2 pr-4">Type</th>
                <th className="pb-2 pr-4">Status</th>
                <th className="pb-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.map((o) => (
                <tr key={o.id} className="border-b border-dank-border/50 last:border-0">
                  <td className="py-2.5 pr-4 text-gray-300">{o.customerName}</td>
                  <td className="py-2.5 pr-4 text-xs text-dank-muted">
                    {o.fulfillment === "DELIVERY" ? "🛵 Delivery" : "🏪 Pickup"}
                  </td>
                  <td className="py-2.5 pr-4">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${o.status === "COMPLETED" ? "bg-dank-green/15 text-dank-green" : "bg-dank-gold/15 text-dank-gold"}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="py-2.5 text-right font-semibold">{baht(o.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
