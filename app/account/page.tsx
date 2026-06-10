import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AccountClient from "./AccountClient";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const userId = (session.user as Record<string, unknown>).id as string;

  const [user, orders, loyaltyLogs] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        patientCard: true,
        patientCardImg: true,
        loyaltyPoints: true,
        totalSpent: true,
        createdAt: true,
      },
    }),
    prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { items: true },
    }),
    prisma.loyaltyTransaction.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
  ]);

  if (!user) redirect("/login");

  const POINTS_TO_FREE_GRAM = 20;
  const pointsToNext = POINTS_TO_FREE_GRAM - (user.loyaltyPoints % POINTS_TO_FREE_GRAM);
  const freeGramsAvailable = Math.floor(user.loyaltyPoints / POINTS_TO_FREE_GRAM);

  return (
    <AccountClient
      user={user}
      orders={orders}
      loyaltyLogs={loyaltyLogs}
      freeGramsAvailable={freeGramsAvailable}
      pointsToNext={pointsToNext}
    />
  );
}
