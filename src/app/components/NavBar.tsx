"use client";

import Link from "next/link";
import { User, LogOut } from "lucide-react";
import { useState } from "react";
import { signOut } from "next-auth/react";

export function NavBar({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed z-50 w-full bg-blue-500 px-6 py-3 text-white flex items-center gap-4">
      {!isLoggedIn && <Link href="/">Home</Link>}
      <Link href="/about">About</Link>

      {isLoggedIn && (
        <>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/workouts/new">+ Workout</Link>

          <div className="ml-auto relative">
            <button
              onClick={() => setOpen((v) => !v)}
              className="rounded-full p-2 hover:bg-white/10"
            >
              <User className="h-5 w-5" />
            </button>

            {open && (
              <div
                className="absolute right-0 mt-2 w-40 rounded-md bg-white text-black shadow-lg overflow-hidden"
                onMouseLeave={() => setOpen(false)}
              >
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm hover:bg-gray-200"
                >
                  Profile
                </Link>

                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="cursor-pointer flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-200"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
