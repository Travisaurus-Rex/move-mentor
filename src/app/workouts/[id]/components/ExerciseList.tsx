import { ExerciseCard } from "./ExerciseCard";
import { WorkoutExerciseWithRelations } from "@/lib/types";

export function ExerciseList({
  exercises,
  workoutId,
}: {
  exercises: WorkoutExerciseWithRelations[];
  workoutId: string;
}) {
  if (exercises.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No exercises added yet.</p>
    );
  }

  return (
    <ul className="space-y-4">
      {exercises.map((we) => (
        <ExerciseCard key={we.id} we={we} workoutId={workoutId} />
      ))}
    </ul>
  );
}
