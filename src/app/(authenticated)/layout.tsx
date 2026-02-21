import { redirect } from "next/navigation";
import { Sidebar } from "@/app/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import { getUserWithProfile } from "@/lib/queries/user-profile";
import { UserPreferencesProvider } from "@/lib/context/UserPreferencesContext";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserWithProfile();

  if (!user) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <UserPreferencesProvider
        preferences={{ unitSystem: user.profile.unitSystem }}
      >
        <main className="flex-1 ml-64 p-8">{children}</main>
      </UserPreferencesProvider>
      <Toaster />
    </div>
  );
}
