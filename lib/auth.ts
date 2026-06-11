import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as NextAuthOptions["adapter"],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        login: { label: "Email or Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.login || !credentials?.password) return null;

        const login = credentials.login.trim();
        const user = await prisma.user.findFirst({
          where: {
            OR: [{ email: login }, { phone: login }],
          },
        });

        if (!user || !user.passwordHash) return null;

        const valid = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        );
        if (!valid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          patientCard: user.patientCard,
          loyaltyPoints: user.loyaltyPoints,
          totalSpent: user.totalSpent,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        const u = user as unknown as Record<string, unknown>;
        token.id = u.id as string;
        token.phone = u.phone as string;
        token.patientCard = u.patientCard as string;
        token.loyaltyPoints = u.loyaltyPoints as number;
        token.totalSpent = u.totalSpent as number;
      }
      // Refresh loyalty data on update trigger
      if (trigger === "update" && token.id) {
        const fresh = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { loyaltyPoints: true, totalSpent: true, patientCard: true },
        });
        if (fresh) {
          token.loyaltyPoints = fresh.loyaltyPoints;
          token.totalSpent = fresh.totalSpent;
          token.patientCard = fresh.patientCard;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as Record<string, unknown>).id = token.id;
        (session.user as Record<string, unknown>).phone = token.phone;
        (session.user as Record<string, unknown>).patientCard = token.patientCard;
        (session.user as Record<string, unknown>).loyaltyPoints = token.loyaltyPoints;
        (session.user as Record<string, unknown>).totalSpent = token.totalSpent;
      }
      return session;
    },
  },
};
