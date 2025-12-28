import Link from "next/link";
import { getUser } from "@/lib/auth/auth";
import { getDashboardStats, getUserWorkouts } from "@/lib/queries/workouts";

export default async function DashboardHomePage() {
  const [user, stats, workouts] = await Promise.all([
    getUser(),
    getDashboardStats(),
    getUserWorkouts(),
  ]);

  const { workoutCount, exerciseCount, lastWorkoutDate, workoutsLast7Days } =
    stats;

  return (
    <main className="mx-auto max-w-6xl px-6 py-8 space-y-8">
      <header>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-6 grid-rows-3 gap-4">
        <div className="md:col-span-2 md:row-span-2 rounded-xl bg-[var(--bg-light)] p-6">
          <p className="text-sm text-muted-foreground">Total Workouts</p>
          <p className="mt-4 text-5xl font-semibold">{workoutCount}</p>
        </div>

        <div className="md:col-span-2 rounded-xl bg-[var(--bg-light)] p-6">
          <p className="text-sm text-muted-foreground">Exercises Logged</p>
          <p className="mt-4 text-4xl font-semibold">{exerciseCount}</p>
        </div>

        <div className="md:col-span-2 rounded-xl bg-[var(--bg-light)] p-6">
          <p className="text-sm text-muted-foreground">Last Workout</p>
          <p className="mt-4 text-lg font-medium">
            {lastWorkoutDate ? lastWorkoutDate.toDateString() : "—"}
          </p>
        </div>

        <div className="md:col-span-2 rounded-xl bg-[var(--bg-light)] p-6">
          <p className="text-sm text-muted-foreground">Workouts (7 days)</p>
          <p className="mt-4 text-4xl font-semibold">{workoutsLast7Days}</p>
        </div>

        <div className="md:col-span-4 md:row-span-2 rounded-xl bg-[var(--bg-light)] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Recent Workouts</h2>
            <Link
              href="/workouts/new"
              className="text-sm text-blue-600 hover:underline"
            >
              + New workout
            </Link>
          </div>

          {workouts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No workouts yet.</p>
          ) : (
            <ul className="space-y-2">
              {workouts.slice(0, 3).map((w) => (
                <li key={w.id}>
                  <Link
                    href={`/workouts/${w.id}`}
                    className="block rounded-md px-3 py-2 hover:bg-black/5"
                  >
                    {w.date.toDateString()}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div
          className=" md:col-span-2
            md:row-span-2
            md:col-start-5
            md:row-start-2
            rounded-xl
            bg-[var(--bg-light)]
            p-6
            flex
            flex-col
            justify-between"
        >
          <div>
            <p className="text-sm text-muted-foreground">Account</p>
            <p className="mt-2 font-medium">{user.name ?? "Your profile"}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>

          <Link
            href="/profile"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
          >
            View profile →
          </Link>
        </div>
      </section>
    </main>
  );
}
