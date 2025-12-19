import { Workout } from "@/generated/prisma/client";
import { getUserWorkouts, getUserWorkoutsCount } from "@/lib/queries/workouts"
import { redirect } from "next/navigation";

export default async function DashboardHomePage() {
  let workouts: Workout[];
  let workoutCount: number;

    try {
      workouts = await getUserWorkouts();
      workoutCount = await getUserWorkoutsCount();
    } catch (err) {
      redirect('/api/auth/signin');
    }

    return <>
      <main>
        <h1>Dashboard</h1>
        <div className="text-6xl">{ workoutCount }</div>

        <ul>
          {workouts.map((workout) => (
            <li key={workout.id}>
              {workout.date.toDateString()}
            </li>
          ))}
        </ul>
      </main>
    </>
}