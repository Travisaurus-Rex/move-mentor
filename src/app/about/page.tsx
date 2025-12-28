export default function About() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-4">About MoveMentor</h1>
      <p className="text-lg text-gray-700 max-w-xl text-center">
        MoveMentor is a personal fitness companion designed to help you log
        workouts, track nutrition, and reach your fitness goals. Our mission is
        to make healthy living simple, engaging, and motivating.
      </p>
      <ul className="mt-6 list-disc list-inside text-gray-700 max-w-md">
        <li>Track workouts and performance trends</li>
        <li>Monitor nutrition and calorie intake</li>
        <li>Set and achieve personal goals</li>
        <li>View progress with interactive charts</li>
      </ul>
    </main>
  );
}
