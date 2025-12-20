import { Exercise } from "@/generated/prisma/client";
import { getAllExercises, getWorkoutById } from "@/lib/queries/workouts";

type Props = { params: { id: string } };

export default async function WorkoutPage({ params }: Props) {
  const [workout, exercises] = await Promise.all([
    getWorkoutById(params.id),
    getAllExercises(),
  ]);

  return (
    <main style={{ padding: 24 }}>
      <h1>Workout</h1>

      <p>
        <strong>Date:</strong> {workout.date.toDateString()}
      </p>
      {workout.notes && (
        <p>
          <strong>Notes:</strong> {workout.notes}
        </p>
      )}

      <hr />

      {/* Exercise selector (no submit yet) */}
      <label>
        Add exercise:
        <select>
          <option value="">Select…</option>
          {exercises.map((e: Exercise) => (
            <option key={e.id} value={e.id}>
              {e.name}
            </option>
          ))}
        </select>
      </label>

      <hr />

      <h2>Exercises</h2>
      <ul>
        {workout.exercises.map((e) => (
          <li key={e.id}>{e.exercise.name}</li>
        ))}
      </ul>
    </main>
  );
}
