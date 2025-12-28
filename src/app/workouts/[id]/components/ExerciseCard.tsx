import { deleteExerciseFromWorkout } from "../../actions";
import { AddSetForm } from "./AddSetForm";
import { RemoveExerciseButton } from "./RemoveExerciseButton";
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
    <li className="group rounded-lg border border-border p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{we.exercise.name}</h3>

        <RemoveExerciseButton workoutExerciseId={we.id} workoutId={workoutId} />
      </div>

      <SetList sets={we.sets} workoutId={workoutId} />
      <AddSetForm workoutId={workoutId} workoutExerciseId={we.id} />
    </li>
  );
}
