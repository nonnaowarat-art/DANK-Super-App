import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    id: "prod_01",
    name: "Northern Lights",
    description:
      "A legendary indica known for its deeply relaxing body high and resinous, frosty buds. Great for unwinding at the end of the day.",
    price: 45,
    category: "Flower",
    imageUrl:
      "https://images.unsplash.com/photo-1603909223429-69bb7101f420?w=800&q=80",
    tags: "relax,sleep,calm,pain-relief,evening,earthy,couch-lock",
    stock: 40,
    strainType: "Indica",
    thc: 22,
    cbd: 0.4,
  },
  {
    id: "prod_02",
    name: "Sour Diesel",
    description:
      "A fast-acting sativa with a pungent diesel aroma. Energizing and uplifting — a favorite for daytime creativity and focus.",
    price: 48,
    category: "Flower",
    imageUrl:
      "https://images.unsplash.com/photo-1536689318884-9d2c1b6a3a16?w=800&q=80",
    tags: "energy,focus,uplift,creative,daytime,citrus,social",
    stock: 35,
    strainType: "Sativa",
    thc: 24,
    cbd: 0.2,
  },
  {
    id: "prod_03",
    name: "Blue Dream",
    description:
      "A balanced hybrid pairing a gentle cerebral lift with full-body relaxation. Sweet berry notes make it an all-day crowd pleaser.",
    price: 46,
    category: "Flower",
    imageUrl:
      "https://images.unsplash.com/photo-1585952326541-4ab9d4a35d40?w=800&q=80",
    tags: "balanced,happy,relax,creative,berry,daytime,mellow",
    stock: 50,
    strainType: "Hybrid",
    thc: 21,
    cbd: 0.5,
  },
  {
    id: "prod_04",
    name: "Granddaddy Purple",
    description:
      "Classic indica with deep purple hues and a grape-berry aroma. Heavy relaxation that melts away stress and tension.",
    price: 50,
    category: "Flower",
    imageUrl:
      "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?w=800&q=80",
    tags: "relax,sleep,stress-relief,grape,evening,heavy",
    stock: 28,
    strainType: "Indica",
    thc: 23,
    cbd: 0.3,
  },
  {
    id: "prod_05",
    name: "Jack Herer Pre-Rolls (3-pack)",
    description:
      "Three half-gram pre-rolls of the iconic sativa Jack Herer. Clear-headed, blissful and ready to spark whenever you are.",
    price: 25,
    category: "Pre-Rolls",
    imageUrl:
      "https://images.unsplash.com/photo-1591868275863-3a0c3b3a3b3a?w=800&q=80",
    tags: "energy,focus,uplift,social,piney,daytime,convenient",
    stock: 60,
    strainType: "Sativa",
    thc: 20,
    cbd: 0.2,
  },
  {
    id: "prod_06",
    name: "Wedding Cake Live Resin Cart",
    description:
      "0.5g live resin vape cartridge bursting with the rich, tangy-sweet terpenes of Wedding Cake. Smooth, potent hybrid effects.",
    price: 40,
    category: "Vapes",
    imageUrl:
      "https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=800&q=80",
    tags: "potent,relax,euphoric,sweet,discreet,convenient,evening",
    stock: 45,
    strainType: "Hybrid",
    thc: 85,
    cbd: 0.1,
  },
  {
    id: "prod_07",
    name: "Cosmic Gummies — Mixed Berry (10pk)",
    description:
      "Ten 10mg THC gummies (100mg total) in a mix of berry flavors. Precisely dosed for a controllable, long-lasting edible experience.",
    price: 22,
    category: "Edibles",
    imageUrl:
      "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=800&q=80",
    tags: "edible,relax,euphoric,fruity,long-lasting,discreet,microdose",
    stock: 80,
    strainType: "Hybrid",
    thc: 100,
    cbd: 0,
  },
  {
    id: "prod_08",
    name: "Calm CBD Gummies — 1:1 (10pk)",
    description:
      "Balanced 1:1 gummies with 10mg CBD and 10mg THC each. Gentle relaxation with reduced intensity — ideal for newcomers.",
    price: 24,
    category: "Edibles",
    imageUrl:
      "https://images.unsplash.com/photo-1597076545399-91a3ff0e71b3?w=800&q=80",
    tags: "edible,calm,relax,balanced,beginner,low-intensity,wellness",
    stock: 70,
    strainType: "Hybrid",
    thc: 100,
    cbd: 100,
  },
  {
    id: "prod_09",
    name: "GG4 Live Badder",
    description:
      "1g of glossy, terpene-rich live badder from the famously sticky GG4. A heavy-hitting hybrid concentrate for seasoned dabbers.",
    price: 55,
    category: "Concentrates",
    imageUrl:
      "https://images.unsplash.com/photo-1605198009332-31d5a1c1e8a0?w=800&q=80",
    tags: "potent,relax,euphoric,earthy,experienced,dab,evening",
    stock: 20,
    strainType: "Hybrid",
    thc: 78,
    cbd: 0.2,
  },
  {
    id: "prod_10",
    name: "Borosilicate Glass Pipe",
    description:
      "A hand-blown thick-glass spoon pipe with a comfortable grip and deep bowl. Durable, easy to clean and pocket-friendly.",
    price: 30,
    category: "Accessories",
    imageUrl:
      "https://images.unsplash.com/photo-1603051685789-a4c5e1bccf25?w=800&q=80",
    tags: "accessory,glass,pipe,gift,durable",
    stock: 55,
    strainType: null,
    thc: null,
    cbd: null,
  },
  {
    id: "prod_11",
    name: "Hemp Wick & Lighter Kit",
    description:
      "A spool of natural hemp wick paired with a refillable torch lighter — for a cleaner, butane-free light every time.",
    price: 14,
    category: "Accessories",
    imageUrl:
      "https://images.unsplash.com/photo-1574607383476-f517f260d30b?w=800&q=80",
    tags: "accessory,lighter,hemp-wick,gift,essential",
    stock: 120,
    strainType: null,
    thc: null,
    cbd: null,
  },
  {
    id: "prod_12",
    name: "Bamboo Rolling Tray Set",
    description:
      "A smooth bamboo rolling tray with magnetic lid, brush and storage compartments to keep your sessions tidy.",
    price: 28,
    category: "Accessories",
    imageUrl:
      "https://images.unsplash.com/photo-1536689318884-9d2c1b6a3a16?w=800&q=80",
    tags: "accessory,rolling-tray,gift,organization,bamboo",
    stock: 65,
    strainType: null,
    thc: null,
    cbd: null,
  },
];

async function main() {
  console.log("Seeding products...");
  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: product,
      create: product,
    });
  }
  const count = await prisma.product.count();
  console.log(`Done — ${count} products in database.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
