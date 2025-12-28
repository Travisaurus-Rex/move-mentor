import { Exercise } from "@/lib/types";
import { addExerciseToWorkout } from "../../actions";
import { Button } from "@/app/components/Button";

export function AddExerciseForm({
  workoutId,
  exercises,
}: {
  workoutId: string;
  exercises: Exercise[];
}) {
  return (
    <form action={addExerciseToWorkout} className="flex items-center gap-3">
      <input type="hidden" name="workoutId" value={workoutId} />

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

      <Button type="submit">Add</Button>
    </form>
  );
}
