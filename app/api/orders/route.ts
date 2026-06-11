import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerName, email, phone, fulfillment, address, notes, items } = body;

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

    const order = await prisma.order.create({
      data: {
        customerName,
        email,
        phone,
        notes: notes ?? "",
        address: address ?? "",
        subtotal,
        tax: 0,
        total: subtotal,
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

    return NextResponse.json({ order }, { status: 201 });
  } catch (err) {
    console.error("Order error:", err);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
