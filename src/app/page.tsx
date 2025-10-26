export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50">
      <h1 className="text-5xl font-bold mb-4">Welcome to MoveMentor</h1>
      <p className="text-lg text-gray-700 max-w-xl text-center">
        Track your workouts, nutrition, and fitness goals all in one place. Stay motivated, see your progress, and reach your peak form!
      </p>
      <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        Get Started
      </button>
    </main>
  );
}
