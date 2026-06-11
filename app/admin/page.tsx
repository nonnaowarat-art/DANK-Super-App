import { redirect } from "next/navigation";
import { isAdmin, getDashboardStats } from "@/lib/admin";
import AdminDashboard from "./AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/login");

  const stats = await getDashboardStats();
  return <AdminDashboard stats={stats} />;
}
