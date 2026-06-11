import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { DEMO_PRODUCTS } from "@/lib/demo-data";
import { getAnthropic, AI_MODEL } from "@/lib/anthropic";

export const maxDuration = 60;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

async function getCatalog(): Promise<string> {
  let products;
  try {
    products = await prisma.product.findMany({
      include: { variants: true },
      orderBy: { thc: "desc" },
    });
  } catch {
    products = DEMO_PRODUCTS;
  }
  return products
    .map((p) => {
      const variants = p.variants
        .map((v: { label: string; price: number }) => `${v.label} ฿${v.price}`)
        .join(", ");
      return `- ${p.name} | ${p.category}${p.grade ? ` | ${p.grade}` : ""}${
        p.strainType ? ` | ${p.strainType}` : ""
      }${p.thc ? ` | THC ${p.thc}%` : ""} | from ฿${p.price} | options: ${variants} | link: /shop/${p.handle}`;
    })
    .join("\n");
}

function buildSystemPrompt(catalog: string): string {
  return `You are the DANK Budtender — the friendly AI assistant for DANK Cannabis Club in Bangkok, Thailand.

ABOUT THE SHOP:
- Location: Phatthanakan 1st Alley, Bangkok (map: https://maps.app.goo.gl/Baq25RxznXyLc5VB7)
- Open 24 hours, every day
- Pickup AND delivery available 24/7
- Phone: 084-162-0610 | LINE: @dankclubbkk | Instagram: @dankclub.official
- Loyalty program: every ฿100 spent = 1 point, 20 points = 1 free gram
- Cannabis patient card: customers with a Thai cannabis patient card get verified status. New customers can get one same-day at a clinic via the Mor Prom system.
- Grades: Super Exotic (THC 34-60%, the pinnacle), Exotic (THC 24-35%), Top Shelf (THC 25-32%), Mid Grade (THC 18-30%, great value)

PRODUCT CATALOG:
${catalog}

YOUR JOB:
- Recommend products based on the customer's mood, desired effects, experience level, and budget
- Sativa = energy/creativity/daytime; Indica = relax/sleep/nighttime; Hybrid = balanced
- For beginners, recommend lower THC or Mid Grade; warn gently about high-THC products
- Answer questions about hours, delivery, location, loyalty points, and patient cards
- When you recommend a product, mention its name, price, and link (e.g. /shop/handle-here)
- Reply in the same language the customer uses (Thai or English)
- Keep replies short and friendly — this is a chat widget, 2-4 sentences plus a product suggestion is ideal
- To order: add to cart on the site, or message LINE @dankclubbkk
- Never give medical advice. Remind customers products are for adults 20+ and to consume responsibly when relevant.
- Only discuss DANK products and shop topics. Politely decline anything else.`;
}

export async function POST(req: NextRequest) {
  const client = getAnthropic();
  if (!client) {
    return NextResponse.json(
      {
        error: "AI_OFFLINE",
        message:
          "The AI budtender is offline right now. Message us on LINE @dankclubbkk — we reply 24/7!",
      },
      { status: 503 }
    );
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const messages = (body.messages ?? [])
    .filter(
      (m) =>
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim()
    )
    .slice(-20);

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return NextResponse.json({ error: "No user message" }, { status: 400 });
  }

  const catalog = await getCatalog();

  const stream = client.messages.stream({
    model: AI_MODEL,
    max_tokens: 1024,
    system: [
      {
        type: "text",
        text: buildSystemPrompt(catalog),
        cache_control: { type: "ephemeral" },
      },
    ],
    messages,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch (err) {
        controller.enqueue(
          encoder.encode(
            "\n\n[Connection issue — please try again or message LINE @dankclubbkk]"
          )
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
