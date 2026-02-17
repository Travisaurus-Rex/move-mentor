"use client";

import { Exercise } from "@/lib/types";
import { addExerciseToWorkout } from "../../actions";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AddExerciseForm({
  workoutId,
  exercises,
}: {
  workoutId: string;
  exercises: Exercise[];
}) {
  const [exercise, setExercise] = useState(exercises[0]?.id ?? null);

  if (!exercise) {
    return (
      <p className="text-sm text-muted-foreground">No exercises available.</p>
    );
  }

  return (
    <form action={addExerciseToWorkout} className="flex items-end gap-3">
      <input type="hidden" name="workoutId" value={workoutId} />
      <input type="hidden" name="exerciseId" value={exercise} />

      <div className="flex-1">
        <Select value={exercise} onValueChange={setExercise}>
          <SelectTrigger>
            <SelectValue placeholder="Select an exercise" />
          </SelectTrigger>
          <SelectContent>
            {exercises.map((e) => (
              <SelectItem key={e.id} value={e.id}>
                {e.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit">Add</Button>
    </form>
  );
}
