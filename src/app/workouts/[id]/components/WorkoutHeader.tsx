// components/WorkoutHeader.tsx

import { Workout } from "@/generated/prisma/client";

export function WorkoutHeader({ workout }: { workout: Workout }) {
  return (
    <header className="space-y-2">
      <h1 className="text-2xl font-semibold">Workout</h1>
      <p className="text-sm text-muted-foreground">
        {workout.date.toDateString()}
      </p>
      {workout.notes && (
        <p className="text-sm text-muted-foreground">{workout.notes}</p>
      )}
    </header>
  );
}
