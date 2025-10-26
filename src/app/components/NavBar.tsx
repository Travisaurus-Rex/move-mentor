import Link from "next/link";

export default function NavBar() {
    return <>
        <div className="fixed py-3 px-6 bg-blue-500 text-white w-full flex gap-4">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/dashboard">Dashboard</Link>
        </div>
    </>
}