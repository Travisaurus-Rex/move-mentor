import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import { redirect } from "next/navigation";
import { Sidebar } from "@/app/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">{children}</main>
      <Toaster />
    </div>
  );
}
