import { Trash2 } from "lucide-react";
import { deleteExerciseFromWorkout } from "../../actions";

type Props = {
  workoutExerciseId: string;
  workoutId: string;
};

export function RemoveExerciseButton({ workoutExerciseId, workoutId }: Props) {
  return (
    <form action={deleteExerciseFromWorkout}>
      <input type="hidden" name="workoutExerciseId" value={workoutExerciseId} />
      <input type="hidden" name="workoutId" value={workoutId} />

      <button
        type="submit"
        aria-label="Remove exercise"
        className="cursor-pointer
          opacity-0 group-hover:opacity-100
          transition-opacity
          text-red-600 hover:text-red-700
          focus-visible:opacity-100
        "
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </form>
  );
}
