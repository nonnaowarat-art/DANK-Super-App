import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Variant {
  label: string;
  price: number;
}

interface ProductData {
  handle: string;
  title: string;
  category: string;
  grade: string;
  strain: string | null;
  thc: number | null;
  image: string;
  description: string;
  price: number;
  featured: boolean | null;
  status?: string;
  variants: Variant[];
}

const products: ProductData[] = [
  {
    "handle": "topshelf-pineapple-bang-hybrid-thc-28-32",
    "title": "Topshelf - Pineapple Bang (Hybrid) THC 28-32%",
    "category": "Flower",
    "grade": "Top Shelf",
    "strain": "Hybrid",
    "thc": 28.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/IMG-6093.jpg?v=1781097336",
    "status": "active",
    "description": "King Cherry is a high-potency hybrid that truly lives up to its regal name. Pushing a powerful 28% THC , this Top Shelf strain offers a sophisticated balance of intense cerebral stimulation and a deeply grounding physical body stone. It is a favorite for those who appreciate a dense, premium bud structure characterized by deep forest green hues and",
    "price": 300.0,
    "featured": false,
    "variants": [
      {
        "label": "Pre roll 1joint (300.-)",
        "price": 300.0
      }
    ]
  },
  {
    "handle": "exo-red-hot-hybrid-thc-29-30",
    "title": "EXO - RED HOT (HYBRID) THC 29-30%",
    "category": "Flower",
    "grade": "Exotic",
    "strain": "Hybrid",
    "thc": 29.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/IMG-6090.jpg?v=1781096752",
    "status": "active",
    "description": "Product Overview Baby Cake is a premium, high-potency hybrid that perfectly captures the decadent essence of its Wedding Cake lineage. Pushing an impressive 24-28% THC , this exotic strain is engineered for smokers who desire a luxurious, dessert-like flavor combined with a potent, long-lasting high",
    "price": 400.0,
    "featured": false,
    "variants": [
      {
        "label": "Per roll joint (400.-)",
        "price": 400.0
      }
    ]
  },
  {
    "handle": "exo-wild-cherry-hybrid-thc-30",
    "title": "EXO - WILD CHERRY (HYBRID) THC 29%",
    "category": "Flower",
    "grade": "Exotic",
    "strain": "Hybrid",
    "thc": 29.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/IMG-6089.jpg?v=1781096666",
    "status": "active",
    "description": "Product Overview Baby Cake is a premium, high-potency hybrid that perfectly captures the decadent essence of its Wedding Cake lineage. Pushing an impressive 24-28% THC , this exotic strain is engineered for smokers who desire a luxurious, dessert-like flavor combined with a potent, long-lasting high",
    "price": 400.0,
    "featured": false,
    "variants": [
      {
        "label": "Per roll joint (400.-)",
        "price": 400.0
      }
    ]
  },
  {
    "handle": "exo-coco-chanel-hybrid-thc-26-28",
    "title": "Exo -  Coco Chanel (Hybrid) THC 26-28%",
    "category": "Flower",
    "grade": "Exotic",
    "strain": "Hybrid",
    "thc": 26.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/CB952B9D-5F70-4968-B268-A766D1893BCE.png?v=1780143593",
    "status": "active",
    "description": "Coco Chanel is a sophisticated, high-potency hybrid that embodies luxury and refinement. With a powerful 26-28% THC content, this exotic strain is designed for the discerning smoker who values both an exquisite aesthetic and a complex, potent experience. The buds are typically dense, beautifully structured, and coated in a premium layer of resin th",
    "price": 400.0,
    "featured": false,
    "variants": [
      {
        "label": "Per roll joint (400.-)",
        "price": 400.0
      }
    ]
  },
  {
    "handle": "topshelf-sherb-tank-hybrid-thc-25",
    "title": "Topshelf - Sherb Tank (Hybrid) THC 25%",
    "category": "Flower",
    "grade": "Top Shelf",
    "strain": "Hybrid",
    "thc": 25.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/IMG-5575.png?v=1780144807",
    "status": "active",
    "description": "King Cherry is a high-potency hybrid that truly lives up to its regal name. Pushing a powerful 28% THC , this Top Shelf strain offers a sophisticated balance of intense cerebral stimulation and a deeply grounding physical body stone. It is a favorite for those who appreciate a dense, premium bud structure characterized by deep forest green hues and",
    "price": 300.0,
    "featured": false,
    "variants": [
      {
        "label": "Pre roll 1joint (300.-)",
        "price": 300.0
      }
    ]
  },
  {
    "handle": "topshelf-king-cherryhybrid-thc-28",
    "title": "Topshelf - King cherry(Hybrid) THC 28%",
    "category": "Flower",
    "grade": "Top Shelf",
    "strain": "Hybrid",
    "thc": 28.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/6A808D23-ABAB-45D5-B098-B58A737A0113.png?v=1780144616",
    "status": "active",
    "description": "King Cherry is a high-potency hybrid that truly lives up to its regal name. Pushing a powerful 28% THC , this Top Shelf strain offers a sophisticated balance of intense cerebral stimulation and a deeply grounding physical body stone. It is a favorite for those who appreciate a dense, premium bud structure characterized by deep forest green hues and",
    "price": 300.0,
    "featured": false,
    "variants": [
      {
        "label": "Pre roll 1joint (300.-)",
        "price": 300.0
      }
    ]
  },
  {
    "handle": "exo-pink-zugar-hybrid-thc-22-27",
    "title": "Exo - Pink Zugar (hybrid) THC 22-27%",
    "category": "Flower",
    "grade": "Exotic",
    "strain": "Hybrid",
    "thc": 22.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/IMG-5581.png?v=1780144311",
    "status": "active",
    "description": "Product Overview Baby Cake is a premium, high-potency hybrid that perfectly captures the decadent essence of its Wedding Cake lineage. Pushing an impressive 24-28% THC , this exotic strain is engineered for smokers who desire a luxurious, dessert-like flavor combined with a potent, long-lasting high",
    "price": 400.0,
    "featured": false,
    "variants": [
      {
        "label": "Per roll joint (400.-)",
        "price": 400.0
      }
    ]
  },
  {
    "handle": "exo-ztupid-hybrid-thc-26",
    "title": "Exo - Ztupid (Hybrid) THC 26%",
    "category": "Flower",
    "grade": "Exotic",
    "strain": "Hybrid",
    "thc": 26.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/IMG-5582.png?v=1780144103",
    "status": "active",
    "description": "Product Overview Baby Cake is a premium, high-potency hybrid that perfectly captures the decadent essence of its Wedding Cake lineage. Pushing an impressive 24-28% THC , this exotic strain is engineered for smokers who desire a luxurious, dessert-like flavor combined with a potent, long-lasting high",
    "price": 400.0,
    "featured": false,
    "variants": [
      {
        "label": "Per roll joint (400.-)",
        "price": 400.0
      }
    ]
  },
  {
    "handle": "exo-baby-cake-hybrid-thc-24-28",
    "title": "Exo - Baby Cake (hybrid) THC 24-28%",
    "category": "Flower",
    "grade": "Exotic",
    "strain": "Hybrid",
    "thc": 24.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/CD5473B7-F811-4BB0-A9C6-92BA47595CA5.png?v=1780143697",
    "status": "active",
    "description": "Product Overview Baby Cake is a premium, high-potency hybrid that perfectly captures the decadent essence of its Wedding Cake lineage. Pushing an impressive 24-28% THC , this exotic strain is engineered for smokers who desire a luxurious, dessert-like flavor combined with a potent, long-lasting high",
    "price": 400.0,
    "featured": false,
    "variants": [
      {
        "label": "Per roll joint (400.-)",
        "price": 400.0
      }
    ]
  },
  {
    "handle": "exo-mellowz-hybrid-thc-25-29",
    "title": "Exo - Mellowz (Hybrid) THC 25-29%",
    "category": "Flower",
    "grade": "Exotic",
    "strain": "Hybrid",
    "thc": 25.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/D8AB80ED-9C47-4045-AAB2-3F197CAA0A05.png?v=1780143506",
    "status": "active",
    "description": "Durbanz เป็นสายพันธุ์ที่นำจุดเด่นของตระกูล Durban มาพัฒนาให้มีความเป็น Hybrid ที่ลงตัวมากยิ่งขึ้นครับ ด้วยค่า THC ที่สูงถึง 24-28% ทำให้สายพันธุ์นี้เป็นตัวเลือกอันดับต้นๆ สำหรับผู้ที่มองหาประสบการณ์ที่ \"แรงแต่คุมได้\" ตัวดอกมีลักษณะเรียวยาวและเคลือบไปด้วยชั้นไตรโคมที่เงางาม ดึงดูดสายตาและแสดงถึงคุณภาพระดับ Exotic ได้อย่างชัดเจน",
    "price": 400.0,
    "featured": false,
    "variants": [
      {
        "label": "Per roll joint (400.-)",
        "price": 400.0
      }
    ]
  },
  {
    "handle": "exo-durbanz-hybrid-thc-24-29",
    "title": "Exo - Durbanz (Hybrid) THC 24-28%",
    "category": "Flower",
    "grade": "Exotic",
    "strain": "Hybrid",
    "thc": 24.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/IMG-5573.png?v=1780143388",
    "status": "active",
    "description": "Durbanz เป็นสายพันธุ์ที่นำจุดเด่นของตระกูล Durban มาพัฒนาให้มีความเป็น Hybrid ที่ลงตัวมากยิ่งขึ้นครับ ด้วยค่า THC ที่สูงถึง 24-28% ทำให้สายพันธุ์นี้เป็นตัวเลือกอันดับต้นๆ สำหรับผู้ที่มองหาประสบการณ์ที่ \"แรงแต่คุมได้\" ตัวดอกมีลักษณะเรียวยาวและเคลือบไปด้วยชั้นไตรโคมที่เงางาม ดึงดูดสายตาและแสดงถึงคุณภาพระดับ Exotic ได้อย่างชัดเจน",
    "price": 400.0,
    "featured": false,
    "variants": [
      {
        "label": "Per roll joint (400.-)",
        "price": 400.0
      }
    ]
  },
  {
    "handle": "exo-grape-stank-hybrid-sativa-thc-26-30",
    "title": "Exo - Grape Stank (Hybrid Sativa) THC 26-30%",
    "category": "Flower",
    "grade": "Exotic",
    "strain": "Sativa",
    "thc": 26.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/00E1D4FC-CC4C-49EC-AE88-C7230F3F08AF.png?v=1780143231",
    "status": "active",
    "description": "Product Overview Grape Stank is a terpene-heavy powerhouse designed for those who appreciate the complex, funky, and bold side of cannabis. Pushing a high 26-30% THC , this hybrid leans towards the Sativa side, delivering a razor-sharp mental focus wrapped in a layer of deep, grape-infused relaxatio",
    "price": 400.0,
    "featured": false,
    "variants": [
      {
        "label": "Per roll joint (400.-)",
        "price": 400.0
      }
    ]
  },
  {
    "handle": "exo-durbanz-hybrid-thc-24-28",
    "title": "Exo - DURBANZ (Hybrid) THC 24-28%..",
    "category": "Flower",
    "grade": "Exotic",
    "strain": "Hybrid",
    "thc": 24.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/IMG-5252.png?v=1779641365",
    "status": "active",
    "description": "Durbanz takes the legendary, electric energy of classic African Sativa genetics and masterfully balances it into a high-powered Hybrid framework. Pushing an impressive 24-28% THC range, this strain is a favorite among connoisseurs who want a clean, hard-hitting buzz that keeps the mind sharp while k",
    "price": 400.0,
    "featured": false,
    "variants": [
      {
        "label": "Per roll 1 joint (400.-)",
        "price": 400.0
      }
    ]
  },
  {
    "handle": "mid-grade-sperboof-hybrid-thc-28-30",
    "title": "Mid - grade Superboof (Hybrid) THC 28-30%",
    "category": "Flower",
    "grade": "Mid Grade",
    "strain": "Hybrid",
    "thc": 28.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/IMG-5258.png?v=1779643656",
    "status": "active",
    "description": "Premium Mid Grade cannabis from DANK Cannabis Club Bangkok.",
    "price": 200.0,
    "featured": false,
    "variants": [
      {
        "label": "Per roll joint (200.-)",
        "price": 200.0
      }
    ]
  },
  {
    "handle": "runtz-of-eden-hybrid50-50-thc-29",
    "title": "Runtz Of Eden (Hybrid50/50) THC 29%",
    "category": "Flower",
    "grade": "Exotic",
    "strain": "Hybrid",
    "thc": 29.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/C38C7E34-61F8-4FCB-A3CF-873D2776E325.png?v=1779642817",
    "status": "active",
    "description": "Product Overview Runtz Of Eden is a heavenly hybrid crafted for those who demand ultimate balance alongside extreme potency. Pushing a heavy 29% THC , this Exotic cut inherits the legendary candy sweetness of Runtz and fuses it with the deep, exotic fruit and musky undertones of Forbidden Fruit . Th",
    "price": 400.0,
    "featured": false,
    "variants": [
      {
        "label": "Per roll joint (400.-)",
        "price": 400.0
      }
    ]
  },
  {
    "handle": "exo-lcg-rx11-hybrid-thc-29",
    "title": "Exo - LCG RX11 (Hybrid) THC 29%",
    "category": "Flower",
    "grade": "Exotic",
    "strain": "Hybrid",
    "thc": 29.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/IMG-5253.png?v=1779642559",
    "status": "active",
    "description": "Product Overview LCG RX11 is a high-profile hybrid that brings together two heavyweight contemporary lineages. Pushing a powerful 29% THC , this Exotic cut is engineered for smokers who demand both elite terpene expression and serious potency. The buds are visual gems—extremely dense, featuring a da",
    "price": 400.0,
    "featured": false,
    "variants": [
      {
        "label": "Per roll joint (400.-)",
        "price": 400.0
      }
    ]
  },
  {
    "handle": "exo-toad-venom-hybrid-thc-28-35",
    "title": "Exo - TOAD VENOM (Hybrid) THC 28-35%",
    "category": "Flower",
    "grade": "Exotic",
    "strain": "Hybrid",
    "thc": 28.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/IMG-5254.png?v=1779642336",
    "status": "active",
    "description": "Product Overview Toad Venom is an absolute pharmacological masterpiece designed strictly for seasoned veterans and heavy hitters. Pushing an astronomical 28-35% THC range, this Ultra Exotic hybrid acts like a fast-acting relief for both the mind and body. The buds are exceptionally resinous, dense,",
    "price": 400.0,
    "featured": false,
    "variants": [
      {
        "label": "Per roll joint (400.-)",
        "price": 400.0
      }
    ]
  },
  {
    "handle": "lemon-cherry-gelato-hybrid-thc-31-5",
    "title": "Lemon Cherry Gelato (Hybrid) THC 31.5%",
    "category": "Flower",
    "grade": "Exotic",
    "strain": "Hybrid",
    "thc": 31.5,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/48E8E325-A1F7-43F4-8777-6520094BA6C9.png?v=1780151539",
    "status": "active",
    "description": "LEMON CHERRY GELATO (Ultra Exotic Hybrid) Genetics: Sunset Sherbet x GSC x Unknown Strain Type: Indica-Dominant Hybrid THC: 31.5% Grade: Ultra Exotic (EXO) Product Overview This specific cut of Lemon Cherry Gelato pushes the boundaries of potency, hitting an incredible 31.5% THC . It represents the",
    "price": 400.0,
    "featured": true,
    "variants": [
      {
        "label": "Per roll joint (400.-)",
        "price": 400.0
      }
    ]
  },
  {
    "handle": "superexo-the-snow-brands-watermelon-sativa-thc60-สำเนา",
    "title": "SuperExo - The Snow Brands Pineapple Express (Sativa) THC60%",
    "category": "Flower",
    "grade": "Super Exotic",
    "strain": "Sativa",
    "thc": 60.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/F8CDE9E5-64B9-4526-B65C-9E13833140ED.jpg?v=1776872037",
    "status": "active",
    "description": "Premium Super Exotic cannabis from DANK Cannabis Club Bangkok.",
    "price": 450.0,
    "featured": true,
    "variants": [
      {
        "label": "Half gram (450.-)",
        "price": 450.0
      }
    ]
  },
  {
    "handle": "wacky-worms-gummies",
    "title": "Wacky Worms Gummies",
    "category": "Edibles",
    "grade": "",
    "strain": "Hybrid",
    "thc": null,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/B05B1BFE-3324-4490-9E53-DD30A3A804B5.jpg?v=1774365826",
    "status": "active",
    "description": "Premium Edibles cannabis from DANK Cannabis Club Bangkok.",
    "price": 280.0,
    "featured": false,
    "variants": [
      {
        "label": "Default Title",
        "price": 280.0
      }
    ]
  },
  {
    "handle": "gummies-500mg",
    "title": "Gummies 500mg",
    "category": "Edibles",
    "grade": "",
    "strain": "Hybrid",
    "thc": null,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/B6FCB2C5-67B8-48BE-8624-E5B5ED21ADD0.jpg?v=1774365683",
    "status": "active",
    "description": "Premium Edibles cannabis from DANK Cannabis Club Bangkok.",
    "price": 800.0,
    "featured": false,
    "variants": [
      {
        "label": "Default Title",
        "price": 800.0
      }
    ]
  },
  {
    "handle": "muhameds",
    "title": "Muhameds",
    "category": "Vapes",
    "grade": "",
    "strain": "Hybrid",
    "thc": null,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/581081B6-E329-4DA3-9474-6DC414060F6E.jpg?v=1774365587",
    "status": "active",
    "description": "Premium Vapes cannabis from DANK Cannabis Club Bangkok.",
    "price": 2000.0,
    "featured": false,
    "variants": [
      {
        "label": "Default Title",
        "price": 2000.0
      }
    ]
  },
  {
    "handle": "gummy-500-mg",
    "title": "Gummy 500 MG",
    "category": "Edibles",
    "grade": "",
    "strain": "Hybrid",
    "thc": null,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/6ADB4E12-BF7B-4679-93DC-20454C48A48C.jpg?v=1774365477",
    "status": "active",
    "description": "Premium Edibles cannabis from DANK Cannabis Club Bangkok.",
    "price": 800.0,
    "featured": false,
    "variants": [
      {
        "label": "Default Title",
        "price": 800.0
      }
    ]
  },
  {
    "handle": "sour-belts-3000mg",
    "title": "Sour Belts 3000MG",
    "category": "Edibles",
    "grade": "",
    "strain": "Hybrid",
    "thc": null,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/4B774043-846F-452C-BFB5-43040B22556D.jpg?v=1774364981",
    "status": "active",
    "description": "Premium Edibles cannabis from DANK Cannabis Club Bangkok.",
    "price": 3500.0,
    "featured": false,
    "variants": [
      {
        "label": "1 pack 3000mg (3,500.-)",
        "price": 3500.0
      }
    ]
  },
  {
    "handle": "dank-cookie-50mg",
    "title": "Dank cookie 50MG",
    "category": "Edibles",
    "grade": "",
    "strain": "Hybrid",
    "thc": null,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/19BDC7A2-8DF2-4408-A427-3E36AA5CE49C.jpg?v=1774364851",
    "status": "active",
    "description": "Premium Edibles cannabis from DANK Cannabis Club Bangkok.",
    "price": 200.0,
    "featured": false,
    "variants": [
      {
        "label": "Default Title",
        "price": 200.0
      }
    ]
  },
  {
    "handle": "mid-grade-durban-poison-thc24",
    "title": "Mid grade - Thailand Durian (Hybrid) THC22%",
    "category": "Flower",
    "grade": "Mid Grade",
    "strain": "Hybrid",
    "thc": 22.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/83C2F813-6C1F-4A98-BCBB-B53C99E3634D.jpg?v=1779643290",
    "status": "active",
    "description": "Premium Mid Grade cannabis from DANK Cannabis Club Bangkok.",
    "price": 200.0,
    "featured": false,
    "variants": [
      {
        "label": "Per roll joint (200.-)",
        "price": 200.0
      }
    ]
  },
  {
    "handle": "exo-lemon-zkittles-hybrid-indica-thc-30",
    "title": "Top - Zkittles (Hybrid ) THC 30%",
    "category": "Flower",
    "grade": "Top Shelf",
    "strain": "Hybrid",
    "thc": 30.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/IMG-5586.png?v=1780149518",
    "status": "active",
    "description": "Product Overview Zkittlez is the multi-award-winning king of terpenes, now supercharged to an incredible 30% THC level. This Exotic cut is famous for its \"tasting the rainbow\" experience, featuring chunky, multi-colored buds that are dripping with sweet, candy-like resin. While the original Zkittlez",
    "price": 300.0,
    "featured": false,
    "variants": [
      {
        "label": "Per roll joint (300.-)",
        "price": 300.0
      }
    ]
  },
  {
    "handle": "exo-gelato-x-indica-hybrid-thc-28",
    "title": "Exo - GELATO X (Indica Hybrid) THC 28%",
    "category": "Flower",
    "grade": "Exotic",
    "strain": "Indica",
    "thc": 28.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/5BC567FD-D2D3-40DD-9E61-C184268D134C.png?v=1780151537",
    "status": "active",
    "description": "Gelato X takes the world-famous Gelato genetics to the next level. Known as the \"Extra Strength\" version, this strain offers a more refined and potent experience than the original. At 28% THC , it features dense, purple-streaked buds coated in a heavy layer of icy trichomes. It is the gold standard for smokers who want that classic creamy flavor co",
    "price": 450.0,
    "featured": false,
    "variants": [
      {
        "label": "Per roll 1 joint (450.-)",
        "price": 450.0
      }
    ]
  },
  {
    "handle": "exo-white-sushi-hybrid-thc-34",
    "title": "Top - Now -N- Later (Hybrid) THC 29.5%",
    "category": "Flower",
    "grade": "Top Shelf",
    "strain": "Hybrid",
    "thc": 29.5,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/1D22BB7A-8D68-41AD-B1F0-AD9BFD6144C0.jpg?v=1776279914",
    "status": "active",
    "description": "Premium Top Shelf cannabis from DANK Cannabis Club Bangkok.",
    "price": 300.0,
    "featured": false,
    "variants": [
      {
        "label": "Per roll joint (300.-)",
        "price": 300.0
      }
    ]
  },
  {
    "handle": "exo-rastamon-indica-thc-31",
    "title": "EXO - RASTAMON indica (THC : 31% )",
    "category": "Flower",
    "grade": "Exotic",
    "strain": "Indica",
    "thc": 31.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/6960DB85-424C-4736-8561-8B52DCDDAE2A.png?v=1780151538",
    "status": "active",
    "description": "Rastamon is the \"King of the Forest\" in our collection. This Exotic-grade Indica is meticulously crafted for the true connoisseur who seeks maximum potency and purity. With a staggering 31% THC , it offers a deep, soul-soothing experience that pays homage to traditional Indica roots with modern-day",
    "price": 400.0,
    "featured": true,
    "variants": [
      {
        "label": "Per roll 1 joint (400.-)",
        "price": 400.0
      }
    ]
  },
  {
    "handle": "🔥dank-t-shirt-collection-2025",
    "title": "(NEW) DANK T-SHIRT Collection 2025",
    "category": "Merch",
    "grade": "",
    "strain": "Hybrid",
    "thc": null,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/rn-image_picker_lib_temp_19a88183-a299-4ea3-bcd6-08f12845a4ee.jpg?v=1756065454",
    "status": "active",
    "description": "You can order to change your own name and number. Contact us at (084 162 0610)",
    "price": 294.0,
    "featured": false,
    "variants": [
      {
        "label": "White (Size M L XL 2XL)",
        "price": 294.0
      }
    ]
  },
  {
    "handle": "mid-pin-pin-hybrid-thc-28",
    "title": "MID - Bangkok Lemon  (Sativa ) THC 30 %",
    "category": "Flower",
    "grade": "Mid Grade",
    "strain": "Sativa",
    "thc": 30.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/IMG-5602.png?v=1780153170",
    "status": "active",
    "description": "Premium Mid Grade cannabis from DANK Cannabis Club Bangkok.",
    "price": 200.0,
    "featured": false,
    "variants": [
      {
        "label": "Pre roll 1joint (200.-)",
        "price": 200.0
      }
    ]
  },
  {
    "handle": "bong-session",
    "title": "BONG SESSION",
    "category": "Accessories",
    "grade": "",
    "strain": "Hybrid",
    "thc": null,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/rn-image_picker_lib_temp_2a66b33b-ab91-43c9-88d3-d0872b46c111.jpg?v=1747352386",
    "status": "active",
    "description": "Overall: ⌀37.3mm x 96mm. Glass Thickness: 2.5mm. Bowl Size: 22mm. Height : 10cm.",
    "price": 1400.0,
    "featured": false,
    "variants": [
      {
        "label": "Default Title",
        "price": 1400.0
      }
    ]
  },
  {
    "handle": "raw-tips",
    "title": "RAW¼ & RAW ¼ +TIPS",
    "category": "Accessories",
    "grade": "",
    "strain": "Hybrid",
    "thc": null,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/rn-image_picker_lib_temp_51e6c7d8-7f16-4a03-a68d-5a791a7a4b95.jpg?v=1747351626",
    "status": "active",
    "description": "Premium Accessories cannabis from DANK Cannabis Club Bangkok.",
    "price": 60.0,
    "featured": false,
    "variants": [
      {
        "label": "'- Raw classic ¼",
        "price": 60.0
      }
    ]
  },
  {
    "handle": "grinder-aluminium-2-piece",
    "title": "GRINDER ALUMINIUM 2 PIECE",
    "category": "Accessories",
    "grade": "",
    "strain": "Hybrid",
    "thc": null,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/rn-image_picker_lib_temp_5d48e56c-6cd3-479b-bd25-edcd554da20f.jpg?v=1747350208",
    "status": "active",
    "description": "Premium Accessories cannabis from DANK Cannabis Club Bangkok.",
    "price": 600.0,
    "featured": false,
    "variants": [
      {
        "label": "'- SILVER",
        "price": 600.0
      }
    ]
  },
  {
    "handle": "all-in-one-includes-32-unbleached-rolling-papers-32-tips-a-shredder-tray",
    "title": "ALL-IN-ONE (Includes 32 unbleached rolling papers, 32 tips, a shredder & tray)",
    "category": "Accessories",
    "grade": "",
    "strain": "Hybrid",
    "thc": null,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/rn-image_picker_lib_temp_ef9c4f40-e978-48d5-9118-8329f5030f81.jpg?v=1747347341",
    "status": "active",
    "description": "Premium Accessories cannabis from DANK Cannabis Club Bangkok.",
    "price": 240.0,
    "featured": false,
    "variants": [
      {
        "label": "'- LilBuds",
        "price": 240.0
      }
    ]
  },
  {
    "handle": "sour-belts-cannabis-gummies-3000-mg-big-pack-10-pieces-1-pieces-300-mg",
    "title": "Sour Belts Cannabis gummies 3000 mg. Big pack 10 pieces ( 1 Pieces - 300 mg )",
    "category": "Edibles",
    "grade": "",
    "strain": "Hybrid",
    "thc": null,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/60A4B51E-20C4-491D-8DB1-F249A9A17F19.jpg?v=1722974672",
    "status": "active",
    "description": "4 flavors - Strawberry - Blueberry - Watermelon - Rainbow",
    "price": 2700.0,
    "featured": false,
    "variants": [
      {
        "label": "1 Pack 3000mg (2700 Baht)",
        "price": 2700.0
      }
    ]
  },
  {
    "handle": "backwoods-single",
    "title": "BACKWOODS (SINGLE)",
    "category": "Accessories",
    "grade": "",
    "strain": "Hybrid",
    "thc": null,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/E6E24816-9C5D-4224-BED4-E4EE198728EE.jpg?v=1722467143",
    "status": "active",
    "description": "Backwoods is an American brand of cigars that was introduced in 1973. This product was notable during the 1970s and 1980s for heavy advertising, which became one of the more obvious examples of how companies at the time reacted to changing laws and cultural views on public health and smoking culture",
    "price": 120.0,
    "featured": false,
    "variants": [
      {
        "label": "ORIGINAL",
        "price": 120.0
      }
    ]
  },
  {
    "handle": "blue-zkittles-indica-thc-30-cbg1-exotics",
    "title": "TRE LIVE ROSIN 3500 mg (3.5G) Thc disposable vape",
    "category": "Vapes",
    "grade": "",
    "strain": "Hybrid",
    "thc": null,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/IMG-0857.jpg?v=1726907546",
    "status": "active",
    "description": "Live Rosin disposable 3.5 gram ( 1500 puff )",
    "price": 2800.0,
    "featured": false,
    "variants": [
      {
        "label": "Blueberry slushie Indica",
        "price": 2800.0
      }
    ]
  },
  {
    "handle": "hidden-hills-live-resin-jelly-1000mg",
    "title": "HIDDEN HILLS LIVE RESIN JELLY (1000mg)",
    "category": "Vapes",
    "grade": "",
    "strain": "Hybrid",
    "thc": null,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/93EC5B80-F590-46E5-96BD-F72CA565FB73.jpg?v=1774364815",
    "status": "active",
    "description": "https://hiddenhills.club/collections/edibles 1000 MG per pack / Live Resin Edibles Cryo Infused, D11, D9, THC-P Utilizing the latest cryo infusion process. Each edibles is infused for maximum potency and effectiveness.",
    "price": 600.0,
    "featured": false,
    "variants": [
      {
        "label": "Blue - Bombsicle",
        "price": 600.0
      }
    ]
  },
  {
    "handle": "dank-limited-2023-black-tee",
    "title": "DANK LIMITED 2026 BLACK and White T - Shirt",
    "category": "Merch",
    "grade": "",
    "strain": "Hybrid",
    "thc": null,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/IMG-2016.jpg?v=1771238786",
    "status": "active",
    "description": "Specilased limited edition Tee only for DANKERS",
    "price": 343.0,
    "featured": false,
    "variants": [
      {
        "label": "M",
        "price": 343.0
      }
    ]
  },
  {
    "handle": "dank-2023-white-limited-tee",
    "title": "DANK 2023 WHITE  limited tee",
    "category": "Merch",
    "grade": "",
    "strain": "Hybrid",
    "thc": null,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/IMG-7908.png?v=1710969383",
    "status": "active",
    "description": "Dank limited white tee come in size M,L,XL,2XL",
    "price": 273.0,
    "featured": false,
    "variants": [
      {
        "label": "M",
        "price": 273.0
      }
    ]
  },
  {
    "handle": "water-proof-bag",
    "title": "WATER PROOF BAG",
    "category": "Merch",
    "grade": "",
    "strain": "Hybrid",
    "thc": null,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/9221D9D8-A023-4397-BDD5-584043191141.png?v=1710969052",
    "status": "active",
    "description": "Never get ur phone or special flower wet with DANK water proof bag perfect for Songkran day water festival",
    "price": 120.0,
    "featured": false,
    "variants": [
      {
        "label": "Default Title",
        "price": 120.0
      }
    ]
  },
  {
    "handle": "canna-cavi-moon-rock-hash-70-thc-15-cbd",
    "title": "KAWS Rocks (MOON ROCK HASH60% THC 15%CBD)",
    "category": "Concentrates",
    "grade": "",
    "strain": "Hybrid",
    "thc": 15.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/IMG-3052.jpg?v=1734773931",
    "status": "active",
    "description": "Canna Cavi Moonrocks is a quality flower (either an indica, sativa, or hybrid, depending on your preference) infused with terps, rolled in kief, and soaked in a cannabis concentrate hash oil. It’s essentially moonrocks and/or caviar combined. It’s also the name of a certain company that produces the",
    "price": 712.5,
    "featured": false,
    "variants": [
      {
        "label": "Default Title",
        "price": 712.5
      }
    ]
  },
  {
    "handle": "mac-n-cheeseindica-thc-29-cbg1-exotics",
    "title": "TOP - MAC 1 ( Miracle alien cookie)(Hybrid 50:50)THC 27%CBG1%",
    "category": "Edibles",
    "grade": "",
    "strain": "Hybrid",
    "thc": 27.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/rn-image_picker_lib_temp_02b6fb11-da4f-49f2-ad59-2aec6a5bdc25.jpg?v=1754171337",
    "status": "active",
    "description": "Mac 1 , also known as \"The MAC,\" is a hybrid marijuana strain that crosses Alien Cookies F2 with Miracle 15. Mac 1 is a popular strain that consumers turn to for upbeat and balancing effects. But Mac 1 is special because not just anyone can grow it. In fact, growers of Mac 1 (Capulator's Cut) have b",
    "price": 500.0,
    "featured": false,
    "variants": [
      {
        "label": "0.5 G / 1 Joint = 350฿",
        "price": 500.0
      }
    ]
  },
  {
    "handle": "premium-exo-alien-mints-sativa-thc33",
    "title": "EXO- ALIEN MINTS (SATIVA) THC38%",
    "category": "Flower",
    "grade": "Exotic",
    "strain": "Sativa",
    "thc": 38.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/IMG-2017.jpg?v=1771238878",
    "status": "active",
    "description": "Alien Mints is a hybrid weed strain . Reviewers on Leafly say this strain makes them feel talkative, focused, and aroused. If you've smoked, dabbed, or otherwise enjoyed",
    "price": 400.0,
    "featured": true,
    "variants": [
      {
        "label": "Half gram (400.-)",
        "price": 400.0
      }
    ]
  },
  {
    "handle": "untitled-sep1_15-44",
    "title": "PLASTIC GRINDER",
    "category": "Accessories",
    "grade": "",
    "strain": "Hybrid",
    "thc": null,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/5A110104-F265-40D5-AF13-F22D34C8CB97.jpg?v=1693557942",
    "status": "active",
    "description": "PLASTIC GRINDER GOOD FOR TRAVELING PURPOSE",
    "price": 84.0,
    "featured": false,
    "variants": [
      {
        "label": "Default Title",
        "price": 84.0
      }
    ]
  },
  {
    "handle": "untitled-sep1_15-43",
    "title": "LIGHTER - CLIPPER",
    "category": "Accessories",
    "grade": "",
    "strain": "Hybrid",
    "thc": null,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/rn-image_picker_lib_temp_f07fbe9d-1bb0-40ad-9ed2-1cecdddad837.jpg?v=1747349959",
    "status": "active",
    "description": "GAS REFILLABLE LIGHTER (not torch type)",
    "price": 40.0,
    "featured": false,
    "variants": [
      {
        "label": "Default Title",
        "price": 40.0
      }
    ]
  },
  {
    "handle": "untitled-sep1_15-38",
    "title": "RAW TIPS , RAW WILD TIPS",
    "category": "Accessories",
    "grade": "",
    "strain": "Hybrid",
    "thc": null,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/rn-image_picker_lib_temp_7f82c5da-3aa1-40bd-9f81-b748021a4bbd.jpg?v=1747347667",
    "status": "active",
    "description": "Premium Accessories cannabis from DANK Cannabis Club Bangkok.",
    "price": 51.0,
    "featured": false,
    "variants": [
      {
        "label": "'- Raw Tips",
        "price": 51.0
      }
    ]
  },
  {
    "handle": "untitled-sep1_15-36",
    "title": "RAW CLASSIC , RAW CLASSIC BLACK",
    "category": "Accessories",
    "grade": "",
    "strain": "Hybrid",
    "thc": null,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/5E938697-1B0F-4714-AFE7-E618B5C3CFD2.jpg?v=1693557480",
    "status": "active",
    "description": "Original raw 100% well known and finest quality from USA",
    "price": 80.0,
    "featured": false,
    "variants": [
      {
        "label": "'- Raw Classic Kingsize",
        "price": 80.0
      }
    ]
  },
  {
    "handle": "untitled-sep1_14-13",
    "title": "CANNABIS BROWNIES                 (50MG infused)",
    "category": "Edibles",
    "grade": "",
    "strain": "Hybrid",
    "thc": null,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/D4BA6F7A-1C40-4F24-9DF0-3ADD1D365C47.png?v=1693553371",
    "status": "active",
    "description": "50 mg of cannbis infused with real dark Belgium chocolate for you to try good for beginner eat half piece Amateur eat whole piece",
    "price": 500.0,
    "featured": false,
    "variants": [
      {
        "label": "2 Pack - 500฿",
        "price": 500.0
      }
    ]
  },
  {
    "handle": "untitled-aug28_15-38",
    "title": "Live resin / Rosin Thc 78% ( Watermelon , Candy apple , Peach ring )",
    "category": "Concentrates",
    "grade": "",
    "strain": "Hybrid",
    "thc": 78.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/F65C3592-4891-46E4-8DFD-F934040771D3.jpg?v=1693211965",
    "status": "active",
    "description": "Live resin is one of the most exciting and sought-after cannabis products on the market today. Live marijuana resin is a game-changing concentrate, but what is live resin, and how does it differ from other cannabis extracts? You’re about to find out as we discuss the unique properties of live resin",
    "price": 1200.0,
    "featured": false,
    "variants": [
      {
        "label": "950",
        "price": 1200.0
      }
    ]
  },
  {
    "handle": "untitled-aug28_15-35",
    "title": "MUHAMMEDS THC LIVE RESIN Disposable 2000 mg. ( NEW Season 2026 )",
    "category": "Vapes",
    "grade": "",
    "strain": "Hybrid",
    "thc": null,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/IMG-0764.jpg?v=1766923400",
    "status": "active",
    "description": "if you're sticking to puffs under three seconds, most 0.5-gram carts will last between 80 and 160 puffs . A typical 1-gram oil cart should keep going twice as long—for 160 to 320 puffs. 2 gram disposable twice as long 1000 puff. Based on these numbers, a weed cart can last for as little as a week or",
    "price": 2700.0,
    "featured": false,
    "variants": [
      {
        "label": "2000 mg per 2 g live resin",
        "price": 2700.0
      }
    ]
  },
  {
    "handle": "untitled-aug28_15-34",
    "title": "DIAMOND WAX THC98%",
    "category": "Concentrates",
    "grade": "",
    "strain": "Hybrid",
    "thc": 98.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/490898B9-C7EB-4156-847A-80AA80C3CD7E.jpg?v=1722975003",
    "status": "active",
    "description": "What are THC diamonds? THC Diamonds look a lot like the diamonds you’re already familiar with, hence the name. They are THC crystals made when live resin is extracted from cannabis using a cold-extraction method and pressure. However, the diamonds that form aren’t THC yet, they’re pure THCa crystals",
    "price": 1250.0,
    "featured": false,
    "variants": [
      {
        "label": "0.5G",
        "price": 1250.0
      }
    ]
  },
  {
    "handle": "untitled-aug25_04-31",
    "title": "Premium Exotic JOINTS - Zooties (Pre-roll READY TO SMOKE)",
    "category": "Flower",
    "grade": "Exotic",
    "strain": "Hybrid",
    "thc": null,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/18974187-610E-4BB3-8149-5F9240AEBA54.png?v=1692912822",
    "status": "active",
    "description": "0.5 grams exotic flower “ the best selection from DANK SHOP” pure weed",
    "price": 320.0,
    "featured": null,
    "variants": [
      {
        "label": "Exotics",
        "price": 320.0
      }
    ]
  },
  {
    "handle": "exo-coco-chanel-hybrid-thc-28-28",
    "title": "Exo - Ztupid (Hybrid) THC 26%",
    "category": "Flower",
    "grade": "Exotic",
    "strain": "Hybrid",
    "thc": 26.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/IMG-5582.png?v=1780144103",
    "status": "archived",
    "description": "Durbanz เป็นสายพันธุ์ที่นำจุดเด่นของตระกูล Durban มาพัฒนาให้มีความเป็น Hybrid ที่ลงตัวมากยิ่งขึ้นครับ ด้วยค่า THC ที่สูงถึง 24-28% ทำให้สายพันธุ์นี้เป็นตัวเลือกอันดับต้นๆ สำหรับผู้ที่มองหาประสบการณ์ที่ \"แรงแต่คุมได้\" ตัวดอกมีลักษณะเรียวยาวและเคลือบไปด้วยชั้นไตรโคมที่เงางาม ดึงดูดสายตาและแสดงถึงคุณภาพระดับ Exotic ได้อย่างชัดเจน",
    "price": 400.0,
    "featured": false,
    "variants": [
      {
        "label": "Per roll joint (400.-)",
        "price": 400.0
      }
    ]
  },
  {
    "handle": "exo-durbanz-hybrid-thc-24-28-สำเนา",
    "title": "Exo - DURBANZ (Hybrid) THC 24-28%",
    "category": "Flower",
    "grade": "Exotic",
    "strain": "Hybrid",
    "thc": 24.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/IMG-5252.png?v=1779641365",
    "status": "archived",
    "description": "Durbanz takes the legendary, electric energy of classic African Sativa genetics and masterfully balances it into a high-powered Hybrid framework. Pushing an impressive 24-28% THC range, this strain is a favorite among connoisseurs who want a clean, hard-hitting buzz that keeps the mind sharp while k",
    "price": 400.0,
    "featured": false,
    "variants": [
      {
        "label": "Per roll 1 joint (400.-)",
        "price": 400.0
      }
    ]
  },
  {
    "handle": "ไม่มีชื่อ-24พ-ค-_23-49-10",
    "title": "Exo - DURBANZ (Hybrid) THC 24-28%",
    "category": "Flower",
    "grade": "Exotic",
    "strain": "Hybrid",
    "thc": 24.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/IMG-5252.png?v=1779641365",
    "status": "archived",
    "description": "Durbanz takes the legendary, electric energy of classic African Sativa genetics and masterfully balances it into a high-powered Hybrid framework. Pushing an impressive 24-28% THC range, this strain is a favorite among connoisseurs who want a clean, hard-hitting buzz that keeps the mind sharp while k",
    "price": 400.0,
    "featured": false,
    "variants": [
      {
        "label": "Per roll 1 joint (400.-)",
        "price": 400.0
      }
    ]
  },
  {
    "handle": "the-toad-hybrid-indica-thc-28-35",
    "title": "The Toad (Hybrid INDICA) THC 28-35%",
    "category": "Flower",
    "grade": "Exotic",
    "strain": "Indica",
    "thc": 28.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/IMG-4983.jpg?v=1778934461",
    "status": "archived",
    "description": "Product Overview The Toad is a legendary, heavy-hitting masterpiece designed strictly for seasoned veterans. Named after its profound, mind-altering, and deeply meditative effects, this strain pushes the absolute limits of cannabis potency with a staggering 28-35% THC range. The buds are uniquely de",
    "price": 400.0,
    "featured": false,
    "variants": [
      {
        "label": "Per roll joint (400.-)",
        "price": 400.0
      }
    ]
  },
  {
    "handle": "topshelf-bluedream-sativa-thc-26-สำเนา",
    "title": "Topshelf - Orange Cream (Sativa) THC 29%",
    "category": "Flower",
    "grade": "Top Shelf",
    "strain": "Sativa",
    "thc": 29.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/IMG-3873.jpg?v=1776870860",
    "status": "archived",
    "description": "Premium Top Shelf cannabis from DANK Cannabis Club Bangkok.",
    "price": 300.0,
    "featured": false,
    "variants": [
      {
        "label": "Per roll joint (300.-)",
        "price": 300.0
      }
    ]
  },
  {
    "handle": "topshelf-bluedream-sativa-thc-26",
    "title": "Topshelf - Bluedream (Sativa) THC 26%",
    "category": "Flower",
    "grade": "Top Shelf",
    "strain": "Sativa",
    "thc": 26.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/IMG-3870.jpg?v=1776870349",
    "status": "archived",
    "description": "Product Overview Blue Dream is the ultimate California classic, and this 26% THC Exotic cut brings it to a whole new level. It is the perfect \"all-rounder\" that balances the sweet, berry-filled relaxation of Blueberry with the energetic, cerebral invigorations of Haze . At 26% THC , it delivers a po",
    "price": 300.0,
    "featured": false,
    "variants": [
      {
        "label": "Per roll joint (300.-)",
        "price": 300.0
      }
    ]
  },
  {
    "handle": "exo-permanent-bx-1-indica-thc-30",
    "title": "Exo - Permanent BX 1 (Indica) THC 30%",
    "category": "Flower",
    "grade": "Exotic",
    "strain": "Indica",
    "thc": 30.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/DD0D49B4-3D96-4ADC-9BA2-800C2E473C9E.jpg?v=1774907227",
    "status": "archived",
    "description": "Premium Exotic cannabis from DANK Cannabis Club Bangkok.",
    "price": 400.0,
    "featured": true,
    "variants": [
      {
        "label": "Half gram (400.-)",
        "price": 400.0
      }
    ]
  },
  {
    "handle": "exo-mimozz-mimozz-x-peach-sativa-thc-28",
    "title": "Topshelf- Mimozz Mimozz x peach (Sativa) THC 28%",
    "category": "Flower",
    "grade": "Top Shelf",
    "strain": "Sativa",
    "thc": 28.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/E38A05B5-9349-4FDA-BCDB-AB672ACC8699.jpg?v=1774801541",
    "status": "archived",
    "description": "Premium Top Shelf cannabis from DANK Cannabis Club Bangkok.",
    "price": 400.0,
    "featured": false,
    "variants": [
      {
        "label": "Half gram (300.-)",
        "price": 400.0
      }
    ]
  },
  {
    "handle": "super-exo-the-snow-brand-banana-indica-thc60",
    "title": "Super Exo - The snow brand BANANA (Indica) THC60%",
    "category": "Flower",
    "grade": "Super Exotic",
    "strain": "Indica",
    "thc": 60.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/A78ABE44-FB9D-4901-A327-323598427DFA.jpg?v=1774633985",
    "status": "archived",
    "description": "Premium Super Exotic cannabis from DANK Cannabis Club Bangkok.",
    "price": 450.0,
    "featured": true,
    "variants": [
      {
        "label": "Half gram (450.-)",
        "price": 450.0
      }
    ]
  },
  {
    "handle": "superexo-the-snow-brands-sativa-thc60",
    "title": "SuperExo - The Snow Brands  Watermelon (Sativa) THC60%",
    "category": "Flower",
    "grade": "Super Exotic",
    "strain": "Sativa",
    "thc": 60.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/41910043-D779-41EE-AC90-F03E6ABA7581.jpg?v=1774633554",
    "status": "archived",
    "description": "Premium Super Exotic cannabis from DANK Cannabis Club Bangkok.",
    "price": 450.0,
    "featured": true,
    "variants": [
      {
        "label": "Half gram (450.-)",
        "price": 450.0
      }
    ]
  },
  {
    "handle": "exotic-guava-candy-sativa-thc-30-สำเนา",
    "title": "Exotic  -GUAVA CANDY (SATIVA) THC 30%",
    "category": "Flower",
    "grade": "Exotic",
    "strain": "Sativa",
    "thc": 30.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/IMG-2008.jpg?v=1771238071",
    "status": "archived",
    "description": "Premium Exotic cannabis from DANK Cannabis Club Bangkok.",
    "price": 400.0,
    "featured": true,
    "variants": [
      {
        "label": "Pre roll 1joint (450.-)",
        "price": 400.0
      }
    ]
  },
  {
    "handle": "exo-tea-time-sativa-thc27",
    "title": "Exo - Tea Time (Sativa) THC27%",
    "category": "Flower",
    "grade": "Exotic",
    "strain": "Sativa",
    "thc": 27.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/375A2481-E470-4D82-91EF-BE647432E779.jpg?v=1774360300",
    "status": "archived",
    "description": "Premium Exotic cannabis from DANK Cannabis Club Bangkok.",
    "price": 400.0,
    "featured": false,
    "variants": [
      {
        "label": "Half gram (400.-)",
        "price": 400.0
      }
    ]
  },
  {
    "handle": "exo-emergency-sativa-thc30",
    "title": "Exo - Emergency (Sativa) THC30%",
    "category": "Flower",
    "grade": "Exotic",
    "strain": "Sativa",
    "thc": 30.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/IMG-2123.jpg?v=1774361288",
    "status": "archived",
    "description": "Premium Exotic cannabis from DANK Cannabis Club Bangkok.",
    "price": 400.0,
    "featured": true,
    "variants": [
      {
        "label": "Half gram (400.-)",
        "price": 400.0
      }
    ]
  },
  {
    "handle": "exo-9lione-hybrid-thc28",
    "title": "Topshelf- Macmosa (Sativa) THC28%",
    "category": "Flower",
    "grade": "Top Shelf",
    "strain": "Sativa",
    "thc": 28.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/IMG-3604.png?v=1776289769",
    "status": "archived",
    "description": "Product Overview MACMOSA is a masterfully balanced hybrid that brings together two of the most celebrated genetics in the industry. It combines the heavy-resin, cookie-gas foundation of MAC with the sparkling citrus euphoria of Mimosa . The result is a strain that smells like a fruit basket in a gas",
    "price": 300.0,
    "featured": false,
    "variants": [
      {
        "label": "Half gram (300.-)",
        "price": 300.0
      }
    ]
  },
  {
    "handle": "exo-chocolate-chip-hybrid-thc28",
    "title": "Exo - Chocolate Chip (Hybrid) THC28%",
    "category": "Flower",
    "grade": "Exotic",
    "strain": "Hybrid",
    "thc": 28.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/07D4D9F9-F6BA-4122-A95E-59311603D53C.jpg?v=1774359587",
    "status": "archived",
    "description": "Premium Exotic cannabis from DANK Cannabis Club Bangkok.",
    "price": 400.0,
    "featured": false,
    "variants": [
      {
        "label": "Half gram (400.-)",
        "price": 400.0
      }
    ]
  },
  {
    "handle": "exo-lemon-burst-thc-32",
    "title": "Exo - Lemon Up By Malibu Farm (Sativa) THC 31%",
    "category": "Flower",
    "grade": "Exotic",
    "strain": "Sativa",
    "thc": 31.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/A710A5B1-1BE6-479D-B6A1-6B4D6CCD75F9.jpg?v=1776279444",
    "status": "archived",
    "description": "Premium Exotic cannabis from DANK Cannabis Club Bangkok.",
    "price": 400.0,
    "featured": true,
    "variants": [
      {
        "label": "Per roll joint (400.-)",
        "price": 400.0
      }
    ]
  },
  {
    "handle": "exo-perssure-thc-32",
    "title": "Exo - Perssure (Hybrid INDICA) THC 32%",
    "category": "Flower",
    "grade": "Exotic",
    "strain": "Indica",
    "thc": 32.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/DF957171-0AF9-49A9-8FF8-D10E0EAD0824.jpg?v=1773169333",
    "status": "archived",
    "description": "Premium Exotic cannabis from DANK Cannabis Club Bangkok.",
    "price": 400.0,
    "featured": true,
    "variants": [
      {
        "label": "Per roll joint (400.-)",
        "price": 400.0
      }
    ]
  },
  {
    "handle": "topshelf-cherry-inferno-bkkush-x-hh-thc-32",
    "title": "Topshelf- Lemon Cherry Soap (Hybrid) THC 26%",
    "category": "Flower",
    "grade": "Top Shelf",
    "strain": "Hybrid",
    "thc": 26.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/IMG-5600.png?v=1780153174",
    "status": "archived",
    "description": "Premium Top Shelf cannabis from DANK Cannabis Club Bangkok.",
    "price": 300.0,
    "featured": false,
    "variants": [
      {
        "label": "Per roll joint (300.-)",
        "price": 300.0
      }
    ]
  },
  {
    "handle": "super-exo-zooties-hybrid-thc-34-5",
    "title": "Super Exo - Zooties (Hybrid) THC 34.5%",
    "category": "Flower",
    "grade": "Super Exotic",
    "strain": "Hybrid",
    "thc": 34.5,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/IMG-1154.jpg?v=1773168831",
    "status": "archived",
    "description": "Premium Super Exotic cannabis from DANK Cannabis Club Bangkok.",
    "price": 400.0,
    "featured": true,
    "variants": [
      {
        "label": "Per roll joint (400.-)",
        "price": 400.0
      }
    ]
  },
  {
    "handle": "superexo-candy-man-hybrid-thc-32",
    "title": "SuperExo - Candy Man (Hybrid) THC 32%",
    "category": "Edibles",
    "grade": "",
    "strain": "Hybrid",
    "thc": 32.0,
    "image": "https://cdn.shopify.com/s/files/1/0812/7053/8528/files/IMG-1152.jpg?v=1773168290",
    "status": "archived",
    "description": "Premium Edibles cannabis from DANK Cannabis Club Bangkok.",
    "price": 400.0,
    "featured": false,
    "variants": [
      {
        "label": "Pre roll joint (400.-)",
        "price": 400.0
      }
    ]
  }
];

async function main() {
  console.log("Seeding DANK products...");
  
  for (const p of products) {
    const product = await prisma.product.upsert({
      where: { handle: p.handle },
      update: {
        name: p.title,
        description: p.description,
        price: p.price,
        category: p.category,
        grade: p.grade,
        imageUrl: p.image,
        strainType: p.strain,
        thc: p.thc,
        featured: p.featured ?? false,
        stock: 99,
      },
      create: {
        handle: p.handle,
        name: p.title,
        description: p.description,
        price: p.price,
        category: p.category,
        grade: p.grade,
        imageUrl: p.image,
        strainType: p.strain,
        thc: p.thc,
        featured: p.featured ?? false,
        stock: 99,
      },
    });

    // Upsert variants
    if (p.variants.length > 0) {
      await prisma.productVariant.deleteMany({ where: { productId: product.id } });
      await prisma.productVariant.createMany({
        data: p.variants.map((v) => ({
          productId: product.id,
          label: v.label,
          price: v.price,
        })),
      });
    }
  }

  const count = await prisma.product.count();
  console.log(`Done — ${count} products seeded.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
