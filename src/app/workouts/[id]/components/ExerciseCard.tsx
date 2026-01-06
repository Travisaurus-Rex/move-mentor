import { StrengthSetForm } from "./StrengthSetForm";
import { CardioSetForm } from "./CardioSetForm";
import { RemoveExerciseButton } from "./RemoveExerciseButton";
import { SetList } from "./SetList";
import { WorkoutExerciseWithRelations } from "@/lib/types";
import { Card } from "@/app/components/Card";
import { ExerciseCategory } from "@/generated/prisma/enums";

export function ExerciseCard({
  we,
  workoutId,
}: {
  we: WorkoutExerciseWithRelations;
  workoutId: string;
}) {
  return (
    <Card className="group p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-2xl">{we.exercise.name}</h3>

        <RemoveExerciseButton workoutExerciseId={we.id} workoutId={workoutId} />
      </div>

      <SetList
        sets={we.sets}
        workoutId={workoutId}
        category={we.exercise.category}
      />

      {we.exercise.category === ExerciseCategory.STRENGTH && (
        <StrengthSetForm workoutId={workoutId} workoutExerciseId={we.id} />
      )}

      {we.exercise.category === ExerciseCategory.CARDIO && (
        <CardioSetForm workoutId={workoutId} workoutExerciseId={we.id} />
      )}
    </Card>
  );
}
