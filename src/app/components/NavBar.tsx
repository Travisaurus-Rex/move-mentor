import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/authOptions";

export default async function NavBar() {
    const session = await getServerSession(authOptions);

    return <>
        <div className="fixed py-3 px-6 bg-blue-500 text-white w-full flex gap-4">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            { session && 
                <>
                    <Link href="/dashboard">Dashboard</Link>
                    <Link href="/workouts/new">+ Workout</Link>
                </>
            }
        </div>
    </>
}