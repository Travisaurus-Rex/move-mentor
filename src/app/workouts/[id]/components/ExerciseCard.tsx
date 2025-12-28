import { deleteExerciseFromWorkout } from "../../actions";
import { AddSetForm } from "./AddSetForm";
import { SetList } from "./SetList";
import { WorkoutExerciseWithRelations } from "@/lib/types";

export function ExerciseCard({
  we,
  workoutId,
}: {
  we: WorkoutExerciseWithRelations;
  workoutId: string;
}) {
  return (
    <li className="rounded-lg border border-border p-4">
      <h3 className="font-medium flex justify-between">
        {we.exercise.name}
        <form action={deleteExerciseFromWorkout} className="ml-auto">
          <input type="hidden" name="workoutExerciseId" value={we.id} />
          <input type="hidden" name="workoutId" value={workoutId} />

          <button
            type="submit"
            className="text-xs text-destructive hover:underline"
          >
            Remove
          </button>
        </form>
      </h3>

      <SetList sets={we.sets} workoutId={workoutId} />

      <AddSetForm workoutId={workoutId} workoutExerciseId={we.id} />
    </li>
  );
}
