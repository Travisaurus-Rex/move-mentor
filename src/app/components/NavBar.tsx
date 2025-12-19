import Link from "next/link";
import { isAuthenticated } from "@/lib/auth/auth";

export default async function NavBar() {
    const isLoggedIn = await isAuthenticated();

    return <>
        <div className="fixed py-3 px-6 bg-blue-500 text-white w-full flex gap-4">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            { isLoggedIn && 
                <>
                    <Link href="/dashboard">Dashboard</Link>
                    <Link href="/workouts/new">+ Workout</Link>
                </>
            }
        </div>
    </>
}