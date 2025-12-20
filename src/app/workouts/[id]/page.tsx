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
      {workout.exercises.length === 0 ? (
        <p style={{ opacity: 0.7 }}>
          No exercises added yet. Use the selector above to add one.
        </p>
      ) : (
        <ul>
          {workout.exercises.map((we) => (
            <li key={we.id}>{we.exercise.name}</li>
          ))}
        </ul>
      )}
    </main>
  );
}
