import { isAuthenticated } from "@/lib/auth/auth";

export default async function Home() {
  const isLoggedIn: boolean = await isAuthenticated();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50">
      <h1 className="text-5xl font-bold mb-4">Welcome to MoveMentor</h1>
      <p className="text-lg text-gray-700 max-w-xl text-center mb-4">
        Track your workouts, nutrition, and fitness goals all in one place. Stay motivated, see your progress, and reach your peak form!
      </p>
      {!isLoggedIn && (
        <a href="/api/auth/signin">Sign in with GitHub</a>
      )}

      {isLoggedIn && (
        <a href="/api/auth/signout">Sign out</a>
      )}
    </main>
  );
}
