import { Workout } from "@/generated/prisma/client";
import { getUserWorkouts, getUserWorkoutsCount } from "@/lib/queries/workouts";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardHomePage() {
  let workouts: Workout[];
  let workoutCount: number;

  try {
    workouts = await getUserWorkouts();
    workoutCount = await getUserWorkoutsCount();
  } catch (err) {
    redirect("/api/auth/signin");
  }

  return (
    <>
      <main className="p-4">
        <h1>Dashboard</h1>
        <div className="text-6xl">{workoutCount}</div>

        <ul>
          {workouts.map((workout) => (
            <li key={workout.id}>
              <Link href={`/workouts/${workout.id}`}>
                {workout.date.toDateString()}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
