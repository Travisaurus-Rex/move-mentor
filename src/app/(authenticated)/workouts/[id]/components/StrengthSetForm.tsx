import { addSetToExercise } from "../../actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function StrengthSetForm({
  workoutId,
  workoutExerciseId,
}: {
  workoutId: string;
  workoutExerciseId: string;
}) {
  return (
    <form
      action={addSetToExercise}
      className="flex items-center gap-2 pt-2 border-t"
    >
      <input type="hidden" name="workoutId" value={workoutId} />
      <input type="hidden" name="workoutExerciseId" value={workoutExerciseId} />
      <Input
        name="reps"
        type="number"
        placeholder="Reps"
        required
        className="w-20"
      />
      <Input
        name="weight"
        type="number"
        step="0.5"
        placeholder="Weight"
        className="w-24"
      />
      <Input
        name="rpe"
        type="number"
        step="0.5"
        placeholder="RPE"
        className="w-20"
      />
      <Button type="submit" variant="secondary" className="ml-auto">
        Add set
      </Button>
    </form>
  );
}
