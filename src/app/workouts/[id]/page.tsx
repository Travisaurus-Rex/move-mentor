import { getAllExercises, getWorkoutById } from "@/lib/queries/workouts";
import { addExerciseToWorkout } from "../actions";

type Props = { params: { id: string } };

export default async function WorkoutPage({ params }: Props) {
  const { id } = await params;
  const [workout, exercises] = await Promise.all([
    getWorkoutById(id),
    getAllExercises(),
  ]);

  return (
    <main className="mx-auto max-w-3xl px-6 py-8 space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Workout</h1>
        <p className="text-sm text-muted-foreground">
          {workout.date.toDateString()}
        </p>
        {workout.notes && (
          <p className="text-sm text-muted-foreground">{workout.notes}</p>
        )}
      </header>

      <form action={addExerciseToWorkout} className="flex items-center gap-3">
        <input type="hidden" name="workoutId" value={workout.id} />

        <select
          name="exerciseId"
          defaultValue=""
          className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm"
        >
          <option value="" disabled>
            Select exercise…
          </option>
          {exercises.map((e) => (
            <option key={e.id} value={e.id}>
              {e.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Add
        </button>
      </form>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">Exercises</h2>

        {workout.exercises.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No exercises added yet.
          </p>
        ) : (
          <ul className="space-y-4">
            {workout.exercises.map((we) => (
              <li key={we.id} className="rounded-lg border border-border p-4">
                <h3 className="font-medium">{we.exercise.name}</h3>

                {we.sets.length === 0 ? (
                  <p className="mt-2 text-sm text-muted-foreground">
                    No sets logged yet.
                  </p>
                ) : (
                  <ul className="mt-3 space-y-1 text-sm">
                    {we.sets.map((set, index) => (
                      <li key={set.id} className="flex gap-2">
                        <span className="text-muted-foreground">
                          Set {index + 1}:
                        </span>
                        <span>
                          {set.weight ?? "—"} × {set.reps ?? "—"}
                          {set.rpe ? ` (RPE ${set.rpe})` : ""}
                          {set.notes ? ` — ${set.notes}` : ""}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
