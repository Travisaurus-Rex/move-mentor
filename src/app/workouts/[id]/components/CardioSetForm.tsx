import { addSetToExercise } from "../../actions";

type Props = {
  workoutId: string;
  workoutExerciseId: string;
};

export function CardioSetForm({ workoutId, workoutExerciseId }: Props) {
  return (
    <form action={addSetToExercise} className="flex gap-3 items-center">
      <input type="hidden" name="workoutId" value={workoutId} />
      <input type="hidden" name="workoutExerciseId" value={workoutExerciseId} />

      <input
        name="duration"
        type="number"
        placeholder="Duration (min)"
        required
      />

      <input name="distance" type="number" step="0.01" placeholder="Distance" />

      <button type="submit">Add set</button>
    </form>
  );
}
