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
    <li className="group shadow-md rounded-lg p-4 bg-[var(--bg-med)]">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-2xl">{we.exercise.name}</h3>

        <RemoveExerciseButton workoutExerciseId={we.id} workoutId={workoutId} />
      </div>

      <SetList sets={we.sets} workoutId={workoutId} />
      <AddSetForm workoutId={workoutId} workoutExerciseId={we.id} />
    </li>
  );
}
