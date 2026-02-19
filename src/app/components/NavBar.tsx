"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils/cn";

export function NavBar({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <div className="fixed z-50 w-full border-b bg-background/80 backdrop-blur-sm px-6 py-3 flex items-center gap-4">
      <NavigationMenu>
        <NavigationMenuList>
          {!isLoggedIn && (
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/api/auth/signin">Login</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}

          {isLoggedIn && (
            <>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/dashboard">Dashboard</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/workouts">Workouts</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </>
          )}
        </NavigationMenuList>
      </NavigationMenu>

      {isLoggedIn && (
        <div className="ml-auto">
          <button
            className={cn(
              navigationMenuTriggerStyle(),
              "text-red-600 hover:text-red-600 cursor-pointer",
            )}
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOut className="h-4 w-4 mr-2" />
            <span>Sign out</span>
          </button>
        </div>
      )}
    </div>
  );
}
