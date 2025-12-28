import { isAuthenticated } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { Button } from "./components/Button";

export default async function Home() {
  const isLoggedIn: boolean = await isAuthenticated();

  if (isLoggedIn) {
    redirect("/dashboard");
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-5xl font-bold mb-4">Welcome to MoveMentor</h1>
      <p className="text-lg text-gray-700 max-w-xl text-center mb-4">
        Track your workouts, nutrition, and fitness goals all in one place. Stay
        motivated, see your progress, and reach your peak form!
      </p>

      <Button
        href="/api/auth/signin"
        className="bg-blue-500 hover:bg-blue-600 py-3 px-5 rounded text-white"
      >
        Sign in with GitHub
      </Button>
    </main>
  );
}
