import type { Product, ProductVariant } from "./types";

const variants = (prices: { label: string; price: number }[]): ProductVariant[] =>
  prices.map((v, i) => ({ id: `v${i}`, productId: "", ...v }));

export const DEMO_PRODUCTS: Product[] = [
  {
    id: "d1", handle: "superexo-pineapple-express-thc60",
    name: "SuperExo - Pineapple Express (Sativa) THC 60%",
    description: "The Snow Brands ultra-premium Pineapple Express. 60% THC diamonds-infused exotic flower — the absolute pinnacle of our collection.",
    price: 450, category: "Flower", grade: "Super Exotic", strainType: "Sativa", thc: 60, cbd: null,
    imageUrl: "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/F8CDE9E5-64B9-4526-B65C-9.png",
    tags: "sativa,energy,euphoric,top-tier", stock: 99, featured: true, createdAt: new Date(),
    variants: variants([{ label: "Half gram (450.-)", price: 450 }, { label: "Pre roll joint (450.-)", price: 450 }, { label: "Pro 3free1 (2,700.-)", price: 2700 }]),
  },
  {
    id: "d2", handle: "exo-red-hot-hybrid-thc-29-30",
    name: "EXO - RED HOT (Hybrid) THC 29-30%",
    description: "High-potency exotic hybrid with sweet cherry candy on the inhale, earthy pine exhale. Happy, Relaxed, Uplifted, Creative.",
    price: 400, category: "Flower", grade: "Exotic", strainType: "Hybrid", thc: 30, cbd: null,
    imageUrl: "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/IMG-6090.jpg?v=1781096752",
    tags: "hybrid,relax,euphoric", stock: 99, featured: true, createdAt: new Date(),
    variants: variants([{ label: "Pre roll joint (400.-)", price: 400 }, { label: "Half gram (400.-)", price: 400 }, { label: "Pro 3free1 (2,400.-)", price: 2400 }, { label: "1G (800.-)", price: 800 }]),
  },
  {
    id: "d3", handle: "exo-wild-cherry-hybrid-thc-29",
    name: "EXO - WILD CHERRY (Hybrid) THC 29%",
    description: "Premium exotic hybrid. Dense crystalline buds with sweet vanilla frosting aroma, smooth indulgent taste.",
    price: 400, category: "Flower", grade: "Exotic", strainType: "Hybrid", thc: 29, cbd: null,
    imageUrl: "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/IMG-6089.jpg?v=1781096666",
    tags: "hybrid,relax,calm", stock: 99, featured: true, createdAt: new Date(),
    variants: variants([{ label: "Pre roll joint (400.-)", price: 400 }, { label: "Half gram (400.-)", price: 400 }, { label: "Pro 3free1 (2,400.-)", price: 2400 }, { label: "1G (800.-)", price: 800 }]),
  },
  {
    id: "d4", handle: "topshelf-pineapple-bang-hybrid-thc-28-32",
    name: "Topshelf - Pineapple Bang (Hybrid) THC 28-32%",
    description: "Top Shelf hybrid with deep forest green hues, generous amber trichomes, and a sophisticated balance of cerebral stimulation with body relaxation.",
    price: 300, category: "Flower", grade: "Top Shelf", strainType: "Hybrid", thc: 28, cbd: null,
    imageUrl: "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/IMG-6093.jpg?v=1781097336",
    tags: "hybrid,topshelf,balanced", stock: 99, featured: false, createdAt: new Date(),
    variants: variants([{ label: "Pre roll 1joint (300.-)", price: 300 }, { label: "Half gram (300.-)", price: 300 }, { label: "Promotion 3.5g (1,800.-)", price: 1800 }, { label: "1G (600.-)", price: 600 }]),
  },
  {
    id: "d5", handle: "topshelf-king-cherry-hybrid-thc-28",
    name: "Topshelf - King Cherry (Hybrid) THC 28%",
    description: "Regal premium hybrid. Dense buds with ripe cherry and tart berry aromas. Happy, Relaxed, Uplifted, Creative.",
    price: 300, category: "Flower", grade: "Top Shelf", strainType: "Hybrid", thc: 28, cbd: null,
    imageUrl: "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/6A808D23-ABAB-45D5-B098-B58A737A0113.png?v=1780144616",
    tags: "hybrid,topshelf,cherry", stock: 99, featured: false, createdAt: new Date(),
    variants: variants([{ label: "Pre roll 1joint (300.-)", price: 300 }, { label: "Half gram (300.-)", price: 300 }, { label: "Promotion 3.5g (1,800.-)", price: 1800 }, { label: "1G (600.-)", price: 600 }]),
  },
  {
    id: "d6", handle: "mid-grade-superboof-hybrid-thc-28-30",
    name: "Mid Grade - Superboof (Hybrid) THC 28-30%",
    description: "Great value mid-grade hybrid with surprisingly high potency. Perfect for everyday sessions.",
    price: 200, category: "Flower", grade: "Mid Grade", strainType: "Hybrid", thc: 28, cbd: null,
    imageUrl: "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/IMG-5258.png?v=1779643656",
    tags: "hybrid,midgrade,value", stock: 99, featured: false, createdAt: new Date(),
    variants: variants([{ label: "Pre roll joint (200.-)", price: 200 }, { label: "Half gram (200.-)", price: 200 }, { label: "Pro 3free1 (1,200.-)", price: 1200 }, { label: "1G (400.-)", price: 400 }]),
  },
  {
    id: "d7", handle: "gummies-500mg",
    name: "Gummies 500mg",
    description: "Premium THC gummies. Precise dosing for a controllable, long-lasting edible experience.",
    price: 800, category: "Edibles", grade: "", strainType: null, thc: null, cbd: null,
    imageUrl: "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/B6FCB2C5-67B8-48BE-8624-E.png",
    tags: "edible,gummy,500mg", stock: 99, featured: false, createdAt: new Date(),
    variants: variants([{ label: "500mg pack (800.-)", price: 800 }]),
  },
  {
    id: "d8", handle: "ace-ultra-disposable-vape-2000mg",
    name: "ACE ULTRA Premium THC Disposable Vape 2000mg",
    description: "Premium 2000mg disposable vape with liquid diamond concentrate. Multiple strains available.",
    price: 2000, category: "Vapes", grade: "", strainType: null, thc: null, cbd: null,
    imageUrl: "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/581081B6-E329-4DA3-9474-6.png",
    tags: "vape,disposable,2000mg", stock: 99, featured: false, createdAt: new Date(),
    variants: variants([{ label: "2000mg disposable (2,000.-)", price: 2000 }]),
  },
];

export const DEMO_STATS = {
  totalSpent: 12400,
  orders: 8,
  loyaltyPoints: 124,
  freeGrams: 6,
};
