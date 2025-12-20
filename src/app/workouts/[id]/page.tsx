import { getAllExercises, getWorkoutById } from "@/lib/queries/workouts";
import { addExerciseToWorkout } from "../actions";

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

      <form action={addExerciseToWorkout}>
        <input type="hidden" name="workoutId" value={workout.id} />

        <select name="exerciseId" defaultValue="">
          <option value="" disabled>
            Select…
          </option>
          {exercises.map((e) => (
            <option key={e.id} value={e.id}>
              {e.name}
            </option>
          ))}
        </select>

        <button type="submit">Add</button>
      </form>

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
