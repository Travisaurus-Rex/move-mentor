import { getUser } from "@/lib/auth/auth";
import { getUserProfile } from "@/lib/queries/user-profile";
import { SidebarNav } from "./SidebarNav";
import { Zap } from "lucide-react";
import Link from "next/link";

export async function Sidebar() {
  const user = await getUser();
  const profile = await getUserProfile(user.id);

  const displayName = profile?.displayName ?? user.name ?? "Athlete";
  const email = user.email ?? "";
  const image = user.image ?? null;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 flex flex-col border-r border-border bg-white z-40">
      <div className="px-6 py-5 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="font-black text-lg tracking-tight text-foreground uppercase">
            Move<span className="text-primary">Mentor</span>
          </span>
        </Link>
      </div>

      <div className="px-4 py-4 border-b border-border">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-muted/50">
          {image ? (
            <img
              src={image}
              alt={displayName}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
              {displayName[0]?.toUpperCase() ?? "A"}
            </div>
          )}
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-foreground truncate">
              {displayName}
            </span>
            <span className="text-xs text-muted-foreground truncate">
              {email}
            </span>
          </div>
        </div>
      </div>

      <SidebarNav />
    </aside>
  );
}
