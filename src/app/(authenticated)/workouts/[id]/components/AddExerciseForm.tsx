"use client";

import { Exercise } from "@/lib/types";
import { ExerciseCategory } from "@prisma/client";
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
  const [category, setCategory] = useState<ExerciseCategory | null>(null);
  const [exercise, setExercise] = useState<string | null>(null);

  const filteredExercises = category
    ? exercises.filter((e) => e.category === category)
    : [];

  return (
    <form action={addExerciseToWorkout} className="flex items-end gap-3">
      <input type="hidden" name="workoutId" value={workoutId} />
      <input type="hidden" name="exerciseId" value={exercise ?? ""} />

      <Select
        value={category ?? ""}
        onValueChange={(val) => {
          setCategory(val as ExerciseCategory);
          setExercise(null);
        }}
      >
        <SelectTrigger className="flex-1">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ExerciseCategory.STRENGTH}>Strength</SelectItem>
          <SelectItem value={ExerciseCategory.CARDIO}>Cardio</SelectItem>
          <SelectItem value={ExerciseCategory.BODYWEIGHT}>
            Bodyweight
          </SelectItem>
          <SelectItem value={ExerciseCategory.MOBILITY}>Mobility</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={exercise ?? ""}
        onValueChange={setExercise}
        disabled={!category}
      >
        <SelectTrigger className="flex-1">
          <SelectValue placeholder="Select exercise" />
        </SelectTrigger>
        <SelectContent position="popper" className="max-h-80">
          {filteredExercises.map((e) => (
            <SelectItem key={e.id} value={e.id}>
              {e.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button type="submit" disabled={!exercise} className="flex-1">
        Add
      </Button>
    </form>
  );
}
