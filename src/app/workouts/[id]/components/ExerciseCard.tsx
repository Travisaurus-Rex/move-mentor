import { AddSetForm } from "./AddSetForm";
import { SetList } from "./SetList";

export function ExerciseCard({
  we,
  workoutId,
}: {
  we: any;
  workoutId: string;
}) {
  return (
    <li className="rounded-lg border border-border p-4">
      <h3 className="font-medium">{we.exercise.name}</h3>

      <SetList sets={we.sets} />

      <AddSetForm workoutId={workoutId} workoutExerciseId={we.id} />
    </li>
  );
}
