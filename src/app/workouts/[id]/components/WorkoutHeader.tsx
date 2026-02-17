import { Workout } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteWorkout } from "../../actions";

export function WorkoutHeader({ workout }: { workout: Workout }) {
  return (
    <header className="flex items-start justify-between pb-6 border-b">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">
            {workout.date.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </h1>
          <Badge variant="secondary">
            {workout.date.toLocaleDateString("en-US", { year: "numeric" })}
          </Badge>
        </div>
        {workout.notes && (
          <p className="text-sm text-muted-foreground">{workout.notes}</p>
        )}
      </div>

      <form action={deleteWorkout}>
        <input type="hidden" name="workoutId" value={workout.id} />
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </form>
    </header>
  );
}
