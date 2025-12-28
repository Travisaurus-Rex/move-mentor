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
      <h3 className="font-medium">{we.exercise.name}</h3>

      <SetList sets={we.sets} workoutId={workoutId} />

      <AddSetForm workoutId={workoutId} workoutExerciseId={we.id} />
    </li>
  );
}
