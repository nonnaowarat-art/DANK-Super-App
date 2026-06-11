"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import {
  User,
  ShoppingBag,
  Star,
  Gift,
  LogOut,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Upload,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

interface Order {
  id: string;
  status: string;
  fulfillment: string;
  total: number;
  pointsEarned: number;
  createdAt: Date | string;
  items: { name: string; quantity: number; price: number; variant: string }[];
}

interface LoyaltyLog {
  id: string;
  points: number;
  reason: string;
  createdAt: Date | string;
}

interface Props {
  user: {
    id: string;
    name: string | null;
    email: string | null;
    phone: string | null;
    patientCard: string;
    patientCardImg: string | null;
    loyaltyPoints: number;
    totalSpent: number;
    createdAt: Date | string;
  };
  orders: Order[];
  loyaltyLogs: LoyaltyLog[];
  freeGramsAvailable: number;
  pointsToNext: number;
}

type Tab = "overview" | "orders" | "loyalty" | "profile";

const STATUS_STYLES: Record<string, string> = {
  PENDING: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  CONFIRMED: "text-dank-green bg-dank-green/10 border-dank-green/20",
  COMPLETED: "text-gray-400 bg-gray-400/10 border-gray-400/20",
  CANCELLED: "text-red-400 bg-red-400/10 border-red-400/20",
};

const CARD_STYLES: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  NONE: {
    label: "No patient card",
    icon: <AlertCircle className="w-4 h-4" />,
    color: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  },
  PENDING: {
    label: "Card pending review",
    icon: <Clock className="w-4 h-4" />,
    color: "text-sky-400 bg-sky-400/10 border-sky-400/20",
  },
  VERIFIED: {
    label: "Card verified ✓",
    icon: <CheckCircle className="w-4 h-4" />,
    color: "text-dank-green bg-dank-green/10 border-dank-green/20",
  },
};

const POINTS_TO_FREE_GRAM = 20;

export default function AccountClient({
  user,
  orders,
  loyaltyLogs,
  freeGramsAvailable,
  pointsToNext,
}: Props) {
  const [tab, setTab] = useState<Tab>("overview");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [uploadingCard, setUploadingCard] = useState(false);
  const [cardImg, setCardImg] = useState<string>(user.patientCardImg ?? "");
  const [cardFileName, setCardFileName] = useState("");
  const [savingCard, setSavingCard] = useState(false);
  const [cardSaved, setCardSaved] = useState(false);

  const cardInfo = CARD_STYLES[user.patientCard] ?? CARD_STYLES.NONE;
  const progressPct = Math.round(
    ((POINTS_TO_FREE_GRAM - pointsToNext) / POINTS_TO_FREE_GRAM) * 100
  );

  const handleCardUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCardFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => setCardImg(reader.result as string);
    reader.readAsDataURL(file);
    setUploadingCard(true);
  };

  const handleSaveCard = async () => {
    setSavingCard(true);
    await fetch("/api/account/patient-card", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ patientCardImg: cardImg }),
    });
    setSavingCard(false);
    setCardSaved(true);
    setUploadingCard(false);
    setTimeout(() => setCardSaved(false), 3000);
  };

  const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Overview", icon: <User className="w-4 h-4" /> },
    {
      id: "orders",
      label: `Orders (${orders.length})`,
      icon: <ShoppingBag className="w-4 h-4" />,
    },
    {
      id: "loyalty",
      label: "Loyalty",
      icon: <Star className="w-4 h-4" />,
    },
    { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black">
            Hey, {user.name ?? user.email ?? user.phone ?? "Member"} 👋
          </h1>
          <p className="text-sm text-dank-muted mt-0.5">
            Member since{" "}
            {new Date(user.createdAt).toLocaleDateString("en-GB", {
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-2 text-sm text-dank-muted hover:text-white border border-dank-border hover:border-white/20 px-3 py-2 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>

      {/* Quick stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          {
            label: "Total Spent",
            value: `฿${user.totalSpent.toLocaleString()}`,
            sub: "all time",
            color: "text-dank-green",
          },
          {
            label: "Orders",
            value: orders.length,
            sub: "total",
            color: "text-sky-400",
          },
          {
            label: "Points",
            value: user.loyaltyPoints,
            sub: "฿100 = 1pt",
            color: "text-dank-gold",
          },
          {
            label: "Free Grams",
            value: freeGramsAvailable,
            sub: "available",
            color: "text-purple-400",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-dank-card border border-dank-border rounded-2xl p-4"
          >
            <p className="text-xs text-dank-muted mb-1">{s.label}</p>
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-xs text-dank-muted mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-dank-border mb-6 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              tab === t.id
                ? "border-dank-green text-white"
                : "border-transparent text-dank-muted hover:text-white"
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW ── */}
      {tab === "overview" && (
        <div className="space-y-5">
          {/* Patient card status */}
          <div className="bg-dank-card border border-dank-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold">Patient Card Status</h2>
              <span
                className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${cardInfo.color}`}
              >
                {cardInfo.icon}
                {cardInfo.label}
              </span>
            </div>

            {user.patientCard === "NONE" && (
              <div className="bg-amber-400/5 border border-amber-400/20 rounded-xl p-4 space-y-3">
                <p className="text-sm font-semibold text-amber-400">
                  📋 Get your Cannabis Patient Card
                </p>
                <ol className="text-xs text-gray-300 space-y-1.5 list-decimal list-inside leading-relaxed">
                  <li>Visit a hospital or registered clinic in Thailand</li>
                  <li>See a licensed doctor and describe your condition</li>
                  <li>Doctor registers you in the Mor Prom system</li>
                  <li>Receive your patient card — usually same day</li>
                </ol>
                <a
                  href="https://oryor.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300"
                >
                  <ExternalLink className="w-3 h-3" />
                  FDA Thailand
                </a>
                <label className="block mt-2">
                  <div className="flex items-center gap-2 cursor-pointer text-sm text-dank-green hover:text-green-400 transition-colors">
                    <Upload className="w-4 h-4" />
                    Upload card when ready
                  </div>
                  <input type="file" accept="image/*" onChange={handleCardUpload} className="hidden" />
                </label>
              </div>
            )}

            {user.patientCard === "PENDING" && (
              <p className="text-sm text-dank-muted">
                Your card is being reviewed. We&apos;ll notify you via LINE once verified.
              </p>
            )}

            {user.patientCard === "VERIFIED" && user.patientCardImg && (
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={user.patientCardImg}
                  alt="Patient card"
                  className="h-16 rounded-lg object-cover border border-dank-border"
                />
                <p className="text-sm text-dank-muted">Card verified ✓</p>
              </div>
            )}

            {/* Upload card if has one but not yet uploaded */}
            {uploadingCard && cardImg && (
              <div className="mt-3 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={cardImg} alt="Card preview" className="h-16 rounded-lg object-cover border border-dank-border" />
                <div>
                  <p className="text-xs text-dank-muted mb-1">{cardFileName}</p>
                  <button
                    onClick={handleSaveCard}
                    disabled={savingCard}
                    className="text-xs bg-dank-green hover:bg-green-400 text-black font-bold px-3 py-1.5 rounded-lg transition-colors"
                  >
                    {savingCard ? "Saving..." : cardSaved ? "Saved ✓" : "Submit for review"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Loyalty progress */}
          <div className="bg-dank-card border border-dank-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-bold flex items-center gap-2">
                  <Star className="w-4 h-4 text-dank-gold" />
                  Loyalty Points
                </h2>
                <p className="text-xs text-dank-muted mt-0.5">
                  Every ฿100 spent = 1 point · 20 points = 1 free gram
                </p>
              </div>
              <span className="text-2xl font-black text-dank-gold">
                {user.loyaltyPoints} pts
              </span>
            </div>

            {/* Progress to next free gram */}
            <div className="mb-3">
              <div className="flex justify-between text-xs text-dank-muted mb-1.5">
                <span>Progress to next free gram</span>
                <span>
                  {POINTS_TO_FREE_GRAM - pointsToNext}/{POINTS_TO_FREE_GRAM} pts
                </span>
              </div>
              <div className="h-2.5 bg-black rounded-full overflow-hidden border border-dank-border">
                <div
                  className="h-full bg-gradient-to-r from-dank-gold to-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="text-xs text-dank-muted mt-1.5">
                {pointsToNext} more points needed
              </p>
            </div>

            {freeGramsAvailable > 0 && (
              <div className="flex items-center gap-3 bg-dank-gold/10 border border-dank-gold/20 rounded-xl p-3 mt-3">
                <Gift className="w-5 h-5 text-dank-gold shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-dank-gold">
                    {freeGramsAvailable} Free Gram{freeGramsAvailable > 1 ? "s" : ""} Available!
                  </p>
                  <p className="text-xs text-dank-muted">
                    Mention it at pickup or add a note at checkout
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Recent orders */}
          {orders.length > 0 && (
            <div className="bg-dank-card border border-dank-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold">Recent Orders</h2>
                <button
                  onClick={() => setTab("orders")}
                  className="text-xs text-dank-green hover:underline"
                >
                  View all
                </button>
              </div>
              <div className="space-y-2">
                {orders.slice(0, 3).map((o) => (
                  <div
                    key={o.id}
                    className="flex items-center justify-between py-2 border-b border-dank-border last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        #{o.id.slice(-6).toUpperCase()}
                      </p>
                      <p className="text-xs text-dank-muted">
                        {new Date(o.createdAt).toLocaleDateString("en-GB")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-dank-green">
                        ฿{o.total.toLocaleString()}
                      </p>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${STATUS_STYLES[o.status] ?? STATUS_STYLES.PENDING}`}
                      >
                        {o.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── ORDERS ── */}
      {tab === "orders" && (
        <div className="space-y-3">
          {orders.length === 0 ? (
            <div className="text-center py-16 text-dank-muted">
              <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No orders yet</p>
              <Link
                href="/shop"
                className="text-dank-green text-sm hover:underline mt-1 block"
              >
                Browse the shop
              </Link>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-dank-card border border-dank-border rounded-2xl overflow-hidden"
              >
                {/* Order header */}
                <button
                  onClick={() =>
                    setExpandedOrder(
                      expandedOrder === order.id ? null : order.id
                    )
                  }
                  className="w-full flex items-center justify-between p-4 hover:bg-white/3 transition-colors text-left"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-semibold text-sm">
                        #{order.id.slice(-8).toUpperCase()}
                      </p>
                      <p className="text-xs text-dank-muted">
                        {new Date(order.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        {" · "}
                        {order.fulfillment === "DELIVERY" ? "🛵 Delivery" : "🏪 Pickup"}
                      </p>
                    </div>
                    <span
                      className={`hidden sm:inline text-[10px] font-semibold px-2.5 py-1 rounded-full border ${STATUS_STYLES[order.status] ?? STATUS_STYLES.PENDING}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-bold text-dank-green">
                        ฿{order.total.toLocaleString()}
                      </p>
                      {order.pointsEarned > 0 && (
                        <p className="text-xs text-dank-gold">
                          +{order.pointsEarned} pts
                        </p>
                      )}
                    </div>
                    {expandedOrder === order.id ? (
                      <ChevronUp className="w-4 h-4 text-dank-muted" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-dank-muted" />
                    )}
                  </div>
                </button>

                {/* Order items */}
                {expandedOrder === order.id && (
                  <div className="border-t border-dank-border px-4 py-3 space-y-2">
                    {order.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex justify-between text-sm"
                      >
                        <div>
                          <span className="text-gray-300">{item.name}</span>
                          {item.variant && (
                            <span className="text-xs text-dank-muted ml-1">
                              ({item.variant})
                            </span>
                          )}
                          {item.quantity > 1 && (
                            <span className="text-xs text-dank-muted ml-1">
                              ×{item.quantity}
                            </span>
                          )}
                        </div>
                        <span className="text-dank-green font-medium">
                          ฿{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                    <div className="border-t border-dank-border pt-2 flex justify-between font-bold text-sm">
                      <span>Total</span>
                      <span className="text-dank-green">
                        ฿{order.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* ── LOYALTY ── */}
      {tab === "loyalty" && (
        <div className="space-y-5">
          {/* How it works */}
          <div className="bg-dank-card border border-dank-border rounded-2xl p-5">
            <h2 className="font-bold mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-dank-gold" />
              How DANK Points Work
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  icon: "🛒",
                  title: "Spend ฿100",
                  desc: "Every ฿100 you spend earns 1 point automatically",
                },
                {
                  icon: "⭐",
                  title: "Collect 20 Points",
                  desc: "Reach 20 points and unlock a free gram of your choice",
                },
                {
                  icon: "🎁",
                  title: "Redeem Free Gram",
                  desc: "Mention it at pickup or delivery — we'll add it to your order",
                },
              ].map((s) => (
                <div
                  key={s.title}
                  className="bg-black/30 border border-dank-border rounded-xl p-4 text-center"
                >
                  <div className="text-3xl mb-2">{s.icon}</div>
                  <p className="font-semibold text-sm mb-1">{s.title}</p>
                  <p className="text-xs text-dank-muted leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Current balance */}
          <div className="bg-gradient-to-br from-amber-900/30 to-transparent border border-amber-500/20 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-dank-muted">Current Balance</p>
              {freeGramsAvailable > 0 && (
                <span className="text-xs font-bold text-dank-gold bg-dank-gold/10 border border-dank-gold/30 px-2.5 py-1 rounded-full">
                  {freeGramsAvailable} free gram{freeGramsAvailable > 1 ? "s" : ""} ready!
                </span>
              )}
            </div>
            <p className="text-5xl font-black text-dank-gold mb-3">
              {user.loyaltyPoints}
              <span className="text-xl ml-2 font-normal text-dank-muted">pts</span>
            </p>

            {/* Progress bar */}
            <div className="mb-1.5 flex justify-between text-xs text-dank-muted">
              <span>Next free gram</span>
              <span>{POINTS_TO_FREE_GRAM - pointsToNext}/{POINTS_TO_FREE_GRAM}</span>
            </div>
            <div className="h-3 bg-black rounded-full overflow-hidden border border-dank-border">
              <div
                className="h-full bg-gradient-to-r from-dank-gold to-amber-400 rounded-full transition-all"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <p className="text-xs text-dank-muted mt-2">
              Spend ฿{pointsToNext * 100} more to earn the next free gram
            </p>
          </div>

          {/* Transaction history */}
          <div className="bg-dank-card border border-dank-border rounded-2xl p-5">
            <h2 className="font-bold mb-4">Points History</h2>
            {loyaltyLogs.length === 0 ? (
              <p className="text-sm text-dank-muted text-center py-4">
                No points yet — place your first order to start earning!
              </p>
            ) : (
              <div className="space-y-2">
                {loyaltyLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between py-2 border-b border-dank-border last:border-0"
                  >
                    <div>
                      <p className="text-sm">{log.reason}</p>
                      <p className="text-xs text-dank-muted">
                        {new Date(log.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <span
                      className={`font-bold text-sm ${
                        log.points > 0 ? "text-dank-gold" : "text-red-400"
                      }`}
                    >
                      {log.points > 0 ? "+" : ""}
                      {log.points} pts
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── PROFILE ── */}
      {tab === "profile" && (
        <div className="space-y-4">
          <div className="bg-dank-card border border-dank-border rounded-2xl p-5 space-y-3">
            <h2 className="font-bold">Account Info</h2>
            {[
              { label: "Name", value: user.name ?? "—" },
              { label: "Email", value: user.email ?? "—" },
              { label: "Phone", value: user.phone ?? "—" },
              {
                label: "Member Since",
                value: new Date(user.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }),
              },
            ].map((row) => (
              <div key={row.label} className="flex justify-between text-sm border-b border-dank-border pb-2 last:border-0 last:pb-0">
                <span className="text-dank-muted">{row.label}</span>
                <span className="font-medium">{row.value}</span>
              </div>
            ))}
          </div>

          {/* Patient card section */}
          <div className="bg-dank-card border border-dank-border rounded-2xl p-5">
            <h2 className="font-bold mb-3">Patient Card</h2>
            <div className={`flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded-xl border w-fit ${cardInfo.color}`}>
              {cardInfo.icon}
              {cardInfo.label}
            </div>

            {user.patientCard !== "VERIFIED" && (
              <div className="mt-4">
                <label className="block">
                  <div className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-colors ${cardImg && uploadingCard ? "border-dank-green bg-dank-green/5" : "border-dank-border hover:border-dank-green/50"}`}>
                    {cardImg && uploadingCard ? (
                      <div className="flex flex-col items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={cardImg} alt="Patient card" className="max-h-24 rounded-lg object-contain" />
                        <p className="text-xs text-dank-green font-medium">✓ {cardFileName}</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-dank-muted">
                        <Upload className="w-7 h-7" />
                        <p className="text-sm">Upload patient card photo</p>
                      </div>
                    )}
                  </div>
                  <input type="file" accept="image/*" onChange={handleCardUpload} className="hidden" />
                </label>
                {uploadingCard && cardImg && (
                  <button
                    onClick={handleSaveCard}
                    disabled={savingCard}
                    className="mt-3 w-full bg-dank-green hover:bg-green-400 disabled:opacity-50 text-black font-bold py-2.5 rounded-xl transition-colors text-sm"
                  >
                    {savingCard ? "Submitting..." : cardSaved ? "Submitted ✓" : "Submit for Review"}
                  </button>
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-2 border border-red-500/30 text-red-400 hover:bg-red-400/5 py-3 rounded-xl transition-colors text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
