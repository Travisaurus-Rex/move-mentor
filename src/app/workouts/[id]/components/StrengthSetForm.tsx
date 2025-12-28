import { addSetToExercise } from "../../actions";

export function StrengthSetForm({
  workoutId,
  workoutExerciseId,
}: {
  workoutId: string;
  workoutExerciseId: string;
}) {
  return (
    <form action={addSetToExercise} className="mt-3 grid grid-cols-4 gap-2">
      <input type="hidden" name="workoutId" value={workoutId} />
      <input type="hidden" name="workoutExerciseId" value={workoutExerciseId} />

      <input
        name="reps"
        type="number"
        placeholder="Reps"
        required
        className="rounded-md border px-2 py-1 text-sm"
      />

      <input
        name="weight"
        type="number"
        step="0.5"
        placeholder="Weight"
        className="rounded-md border px-2 py-1 text-sm"
      />

      <input
        name="rpe"
        type="number"
        step="0.5"
        placeholder="RPE"
        className="rounded-md border px-2 py-1 text-sm"
      />

      <button
        type="submit"
        className="col-span-4 rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground"
      >
        Add set
      </button>
    </form>
  );
}
