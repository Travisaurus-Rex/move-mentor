import { StrengthSetForm } from "./StrengthSetForm";
import { CardioSetForm } from "./CardioSetForm";
import { RemoveExerciseButton } from "./RemoveExerciseButton";
import { SetList } from "./SetList";
import { WorkoutExerciseWithRelations } from "@/lib/types";
import { ExerciseCategory } from "@prisma/client/enums";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ExerciseCard({
  we,
  workoutId,
}: {
  we: WorkoutExerciseWithRelations;
  workoutId: string;
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold">{we.exercise.name}</h3>
            <Badge variant="outline" className="text-xs capitalize">
              {we.exercise.category.toLowerCase()}
            </Badge>
          </div>
          <RemoveExerciseButton
            workoutExerciseId={we.id}
            workoutId={workoutId}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
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
      </CardContent>
    </Card>
  );
}
