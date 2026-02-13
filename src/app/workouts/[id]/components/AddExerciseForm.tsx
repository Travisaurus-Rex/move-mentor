"use client";

import { Exercise } from "@/lib/types";
import { addExerciseToWorkout } from "../../actions";
import { Button } from "@/app/components/Button";
import { FormSelect } from "@/app/components/FormSelect";
import { useState } from "react";
import { toFormSelectOptions } from "@/lib/utils/toFormSelectOptions";

export function AddExerciseForm({
  workoutId,
  exercises,
}: {
  workoutId: string;
  exercises: Exercise[];
}) {
  const options = toFormSelectOptions(exercises, "name", "id");
  const initVal = options[0];
  const [exercise, setExercise] = useState(initVal.id);

  return (
    <form action={addExerciseToWorkout} className="flex items-end gap-3">
      <input type="hidden" name="workoutId" value={workoutId} />

      <FormSelect
        className="flex-1"
        label="Exercises"
        options={options}
        value={exercise}
        onChange={setExercise}
      />

      <Button type="submit">Add</Button>
    </form>
  );
}
