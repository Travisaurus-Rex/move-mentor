"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, Dumbbell, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/workouts", label: "Workouts", icon: Dumbbell },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <>
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
    </>
  );
}
