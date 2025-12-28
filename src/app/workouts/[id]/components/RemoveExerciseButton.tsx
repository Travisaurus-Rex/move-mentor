import { Trash2 } from "lucide-react";
import { deleteExerciseFromWorkout } from "../../actions";
import { Button } from "@/app/components/Button";

type Props = {
  workoutExerciseId: string;
  workoutId: string;
};

export function RemoveExerciseButton({ workoutExerciseId, workoutId }: Props) {
  return (
    <form action={deleteExerciseFromWorkout}>
      <input type="hidden" name="workoutExerciseId" value={workoutExerciseId} />
      <input type="hidden" name="workoutId" value={workoutId} />

      <Button variant="rose" type="submit">
        <Trash2 className="h-5 w-5" />
      </Button>
    </form>
  );
}
