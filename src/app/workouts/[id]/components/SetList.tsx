"use client";

import { useState } from "react";
import type { Set } from "@/lib/types";
import { deleteSet, updateSet } from "../../actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExerciseCategory } from "@/generated/prisma/enums";

type Props = {
  sets: Set[];
  workoutId: string;
  category: ExerciseCategory;
};

export function SetList({ sets, workoutId, category }: Props) {
  const [editingSetId, setEditingSetId] = useState<string | null>(null);

  if (sets.length === 0) {
    return <p className="text-sm text-muted-foreground">No sets logged yet.</p>;
  }

  return (
    <ul className="space-y-1">
      {sets.map((set, index) => {
        const isEditing = editingSetId === set.id;

        return (
          <li key={set.id} className="rounded-md px-3 py-2 bg-muted/50 text-sm">
            {!isEditing ? (
              <div className="flex items-center gap-3">
                <span className="w-12 text-xs text-muted-foreground font-medium">
                  Set {index + 1}
                </span>
                <span className="flex-1">
                  {category === "STRENGTH" && (
                    <>
                      <span className="font-medium">{set.weight ?? "—"}</span>
                      {" kg × "}
                      <span className="font-medium">{set.reps ?? "—"}</span>
                      {" reps"}
                      {set.rpe ? (
                        <span className="ml-2 text-muted-foreground">
                          RPE {set.rpe}
                        </span>
                      ) : null}
                    </>
                  )}
                  {category === "CARDIO" && (
                    <>
                      <span className="font-medium">{set.duration ?? "—"}</span>
                      {" min"}
                      {set.distance ? (
                        <span className="ml-2 text-muted-foreground">
                          • {set.distance} km
                        </span>
                      ) : null}
                    </>
                  )}
                  {set.notes ? (
                    <span className="ml-2 text-muted-foreground">
                      — {set.notes}
                    </span>
                  ) : null}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-6 text-xs"
                  onClick={() => setEditingSetId(set.id)}
                >
                  Edit
                </Button>
              </div>
            ) : (
              <form action={updateSet} className="flex items-center gap-2">
                <input type="hidden" name="setId" value={set.id} />
                <input type="hidden" name="workoutId" value={workoutId} />

                {category === ExerciseCategory.STRENGTH && (
                  <>
                    <Input
                      name="reps"
                      type="number"
                      placeholder="Reps"
                      defaultValue={set.reps ?? ""}
                      className="h-7 w-16 text-xs"
                    />
                    <Input
                      name="weight"
                      type="number"
                      step="0.5"
                      placeholder="Weight"
                      defaultValue={set.weight ?? ""}
                      className="h-7 w-20 text-xs"
                    />
                    <Input
                      name="rpe"
                      type="number"
                      step="0.5"
                      placeholder="RPE"
                      defaultValue={set.rpe ?? ""}
                      className="h-7 w-16 text-xs"
                    />
                  </>
                )}

                {category === ExerciseCategory.CARDIO && (
                  <>
                    <Input
                      name="duration"
                      type="number"
                      placeholder="Duration"
                      defaultValue={set.duration ?? ""}
                      className="h-7 w-24 text-xs"
                    />
                    <Input
                      name="distance"
                      type="number"
                      step="0.01"
                      placeholder="Distance"
                      defaultValue={set.distance ?? ""}
                      className="h-7 w-24 text-xs"
                    />
                  </>
                )}

                <Input
                  name="notes"
                  type="text"
                  placeholder="Notes"
                  defaultValue={set.notes ?? ""}
                  className="h-7 flex-1 text-xs"
                />

                <Button type="submit" size="sm" className="h-7 text-xs">
                  Save
                </Button>
                <Button
                  type="submit"
                  formAction={deleteSet}
                  variant="destructive"
                  size="sm"
                  className="h-7 text-xs"
                >
                  Delete
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => setEditingSetId(null)}
                >
                  Cancel
                </Button>
              </form>
            )}
          </li>
        );
      })}
    </ul>
  );
}
