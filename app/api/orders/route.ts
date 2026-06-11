import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const POINTS_PER_BAHT = 1 / 100; // 1 point per ฿100

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user
      ? ((session.user as Record<string, unknown>).id as string)
      : null;

    const body = await req.json();
    const { customerName, email, phone, fulfillment, address, notes, items } =
      body;

    if (!customerName || !email || !phone || !items?.length) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const subtotal: number = items.reduce(
      (sum: number, i: { price: number; quantity: number }) =>
        sum + i.price * i.quantity,
      0
    );

    const pointsEarned = Math.floor(subtotal * POINTS_PER_BAHT);

    const order = await prisma.order.create({
      data: {
        userId: userId ?? undefined,
        customerName,
        email,
        phone,
        notes: notes ?? "",
        address: address ?? "",
        subtotal,
        tax: 0,
        total: subtotal,
        pointsEarned,
        status: "PENDING",
        fulfillment: fulfillment === "DELIVERY" ? "DELIVERY" : "PICKUP",
        paymentMethod: "PAY_ON_PICKUP",
        paymentStatus: "COLLECT_ON_PICKUP",
        items: {
          create: items.map(
            (i: {
              productId: string;
              name: string;
              price: number;
              quantity: number;
              variant?: string;
            }) => ({
              productId: i.productId,
              name: i.name,
              price: i.price,
              quantity: i.quantity,
              variant: i.variant ?? "",
            })
          ),
        },
      },
    });

    // Award loyalty points to logged-in user
    if (userId && pointsEarned > 0) {
      await prisma.$transaction([
        prisma.loyaltyTransaction.create({
          data: {
            userId,
            points: pointsEarned,
            reason: `Order #${order.id.slice(-6).toUpperCase()}`,
            orderId: order.id,
          },
        }),
        prisma.user.update({
          where: { id: userId },
          data: {
            loyaltyPoints: { increment: pointsEarned },
            totalSpent: { increment: subtotal },
          },
        }),
      ]);
    }

    return NextResponse.json({ order, pointsEarned }, { status: 201 });
  } catch (err) {
    console.error("Order error:", err);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
