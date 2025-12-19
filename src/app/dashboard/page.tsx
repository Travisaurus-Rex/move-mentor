import { getUserWorkouts } from "@/lib/queries/workouts"

export default async function DashboardHomePage() {
    const workouts = await getUserWorkouts();

    return <>
      <main>
        <h1>Dashboard</h1>

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