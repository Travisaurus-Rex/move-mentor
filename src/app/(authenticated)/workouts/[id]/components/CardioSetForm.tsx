import { addSetToExercise } from "../../actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function CardioSetForm({
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
        name="duration"
        type="number"
        placeholder="Duration (min)"
        required
        className="w-36"
      />
      <Input
        name="distance"
        type="number"
        step="0.01"
        placeholder="Distance"
        className="w-28"
      />
      <Button type="submit" variant="secondary" className="ml-auto">
        Add set
      </Button>
    </form>
  );
}
