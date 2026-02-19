"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, Dumbbell, Settings, LogOut, Zap } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface SidebarProps {
  user: {
    name?: string | null;
    image?: string | null;
    email?: string | null;
  };
}

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/workouts", label: "Workouts", icon: Dumbbell },
];

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 flex flex-col border-r border-border bg-white z-40">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="font-black text-lg tracking-tight text-foreground uppercase">
            Move<span className="text-primary">Mentor</span>
          </span>
        </Link>
      </div>

      {/* User profile */}
      <div className="px-4 py-4 border-b border-border">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-muted/50">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name ?? "User"}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
              {user.name?.[0]?.toUpperCase() ?? "U"}
            </div>
          )}
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-foreground truncate">
              {user.name ?? "Athlete"}
            </span>
            <span className="text-xs text-muted-foreground truncate">
              {user.email ?? ""}
            </span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-4 flex flex-col gap-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-2 mb-2">
          Menu
        </p>
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                active
                  ? "bg-primary text-white shadow-sm shadow-primary/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-4 py-4 border-t border-border flex flex-col gap-1">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
            pathname === "/settings"
              ? "bg-primary text-white shadow-sm shadow-primary/30"
              : "text-muted-foreground hover:text-foreground hover:bg-muted",
          )}
        >
          <Settings className="w-4 h-4 shrink-0" />
          Settings
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 transition-all duration-150 w-full text-left cursor-pointer"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
