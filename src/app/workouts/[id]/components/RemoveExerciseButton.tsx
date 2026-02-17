import { Trash2 } from "lucide-react";
import { deleteExerciseFromWorkout } from "../../actions";
import { Button } from "@/components/ui/button";

export function RemoveExerciseButton({
  workoutExerciseId,
  workoutId,
}: {
  workoutExerciseId: string;
  workoutId: string;
}) {
  return (
    <form action={deleteExerciseFromWorkout}>
      <input type="hidden" name="workoutExerciseId" value={workoutExerciseId} />
      <input type="hidden" name="workoutId" value={workoutId} />
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-destructive"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </form>
  );
}
