import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, Star, Shield } from "lucide-react";
// Logo imported via /public/logo.png
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/types";

async function getFeatured(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { featured: true },
    take: 8,
    orderBy: { thc: "desc" },
    include: { variants: true },
  });
  return products as unknown as Product[];
}

async function getByGrade(grade: string, limit = 4): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { grade },
    take: limit,
    orderBy: { thc: "desc" },
    include: { variants: true },
  });
  return products as unknown as Product[];
}

const GRADE_SECTIONS = [
  {
    grade: "Super Exotic",
    emoji: "👑",
    desc: "THC 34–60% · The absolute pinnacle",
    color: "from-purple-900/40 to-transparent border-purple-500/20",
    badge: "text-purple-400 bg-purple-400/10 border-purple-400/30",
  },
  {
    grade: "Exotic",
    emoji: "🔥",
    desc: "THC 24–35% · Premium EXO flower",
    color: "from-amber-900/40 to-transparent border-amber-500/20",
    badge: "text-amber-400 bg-amber-400/10 border-amber-400/30",
  },
  {
    grade: "Top Shelf",
    emoji: "⭐",
    desc: "THC 25–32% · Consistent quality",
    color: "from-green-900/40 to-transparent border-green-500/20",
    badge: "text-green-400 bg-green-400/10 border-green-400/30",
  },
  {
    grade: "Mid Grade",
    emoji: "💚",
    desc: "THC 18–30% · Great value",
    color: "from-sky-900/40 to-transparent border-sky-500/20",
    badge: "text-sky-400 bg-sky-400/10 border-sky-400/30",
  },
];

export default async function HomePage() {
  const featured = await getFeatured();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-dank-card to-dank-dark border-b border-dank-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,197,94,0.08),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-28 flex flex-col md:flex-row items-start md:items-center gap-10">
          {/* Text side */}
          <div className="flex flex-col items-start gap-6 flex-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-dank-green bg-dank-green/10 border border-dank-green/20 px-3 py-1.5 rounded-full">
              <Zap className="w-3.5 h-3.5" />
              Bangkok&apos;s #1 Cannabis Club · Open 24 hrs
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-none tracking-tight max-w-2xl">
              <span className="text-white">Premium</span>
              <br />
              <span className="text-dank-green">Cannabis</span>
              <br />
              <span className="text-white">Bangkok</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-lg leading-relaxed">
              Super Exotic, EXO, Top Shelf &amp; Mid Grade flower. Edibles, vapes,
              concentrates and accessories — all in one place.
            </p>
            <div className="flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="flex items-center gap-2 bg-dank-green hover:bg-green-400 text-black font-bold px-6 py-3 rounded-xl transition-colors"
            >
              Shop Now
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/shop?grade=Super+Exotic"
              className="flex items-center gap-2 border border-dank-border hover:border-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              👑 Super Exotic
            </Link>
            <a
              href="https://line.me/ti/p/@dankclubbkk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-green-500/40 hover:border-green-500 text-green-400 font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              💬 Order on LINE
            </a>
          </div>
          </div>

          {/* Logo character — right side */}
          <div className="hidden md:flex shrink-0 items-center justify-center">
            <Image
              src="/logo.png"
              alt="DANK Cannabis Club"
              width={320}
              height={320}
              className="w-64 lg:w-80 h-auto object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* Grade selector */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {GRADE_SECTIONS.map((g) => (
            <Link
              key={g.grade}
              href={`/shop?category=Flower&grade=${encodeURIComponent(g.grade)}`}
              className={`group relative flex flex-col gap-2 p-5 rounded-2xl bg-gradient-to-br ${g.color} border hover:border-opacity-60 transition-all hover:scale-[1.02]`}
            >
              <span className="text-2xl">{g.emoji}</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full border w-fit ${g.badge}`}>
                {g.grade}
              </span>
              <p className="text-xs text-gray-400 leading-snug">{g.desc}</p>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors mt-1" />
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">
                <Star className="w-5 h-5 inline-block text-dank-gold mr-2 mb-1" />
                Hot Right Now
              </h2>
              <p className="text-sm text-dank-muted mt-1">
                Highest THC picks curated by the DANK team
              </p>
            </div>
            <Link
              href="/shop?grade=Exotic"
              className="text-sm text-dank-green hover:underline flex items-center gap-1"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Category quick links */}
      <section className="bg-dank-card border-y border-dank-border py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl font-bold mb-6 text-center">
            Shop by Category
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "🌿 Flower", cat: "Flower" },
              { label: "🍬 Edibles", cat: "Edibles" },
              { label: "💨 Vapes", cat: "Vapes" },
              { label: "💎 Concentrates", cat: "Concentrates" },
              { label: "🛠️ Accessories", cat: "Accessories" },
              { label: "👕 Merch", cat: "Merch" },
            ].map(({ label, cat }) => (
              <Link
                key={cat}
                href={`/shop?category=${cat}`}
                className="px-5 py-2.5 rounded-full border border-dank-border hover:border-dank-green/50 hover:bg-dank-green/5 text-sm font-medium text-gray-300 hover:text-white transition-all"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          {
            icon: <Shield className="w-6 h-6 text-dank-green" />,
            title: "Lab-Tested Quality",
            desc: "All products come with verified THC/CBD percentages.",
          },
          {
            icon: <Zap className="w-6 h-6 text-dank-gold" />,
            title: "Open 24 Hours · Pickup & Delivery",
            desc: "Order online anytime. Pickup or delivery available 24/7 to Phatthanakan area.",
          },
          {
            icon: <Star className="w-6 h-6 text-purple-400" />,
            title: "Premium Grades",
            desc: "Super Exotic, EXO, Top Shelf and Mid Grade for every budget.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="flex gap-4 p-5 rounded-2xl bg-dank-card border border-dank-border"
          >
            <div className="shrink-0 mt-0.5">{item.icon}</div>
            <div>
              <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
              <p className="text-sm text-dank-muted leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
