"use client";

import { useState } from "react";
import type { Set } from "@/lib/types";
import { deleteSet, updateSet } from "../../actions";
import { ExerciseCategory } from "@/generated/prisma/enums";

type Props = {
  sets: Set[];
  workoutId: string;
  category: ExerciseCategory;
};

export function SetList({ sets, workoutId, category }: Props) {
  const [editingSetId, setEditingSetId] = useState<string | null>(null);

  if (sets.length === 0) {
    return (
      <p className="mt-2 text-sm text-muted-foreground">No sets logged yet.</p>
    );
  }

  return (
    <ul className="mt-3 space-y-2">
      {sets.map((set, index) => {
        const isEditing = editingSetId === set.id;

        return (
          <li key={set.id}>
            <div className="min-h-[2.25rem] flex items-center">
              {!isEditing ? (
                <div className="flex w-full items-center gap-3 text-sm">
                  <span className="w-12 text-muted-foreground">
                    Set {index + 1}
                  </span>

                  <span className="flex-1 truncate">
                    {category === "STRENGTH" && (
                      <>
                        {set.weight ?? "—"} × {set.reps ?? "—"}
                        {set.rpe ? ` (RPE ${set.rpe})` : ""}
                      </>
                    )}

                    {category === "CARDIO" && (
                      <>
                        {set.duration ?? "—"} min
                        {set.distance ? ` • ${set.distance}` : ""}
                      </>
                    )}

                    {set.notes ? ` — ${set.notes}` : ""}
                  </span>

                  <button
                    type="button"
                    onClick={() => setEditingSetId(set.id)}
                    className="text-xs text-muted-foreground hover:underline"
                  >
                    Edit
                  </button>
                </div>
              ) : (
                <form
                  action={updateSet}
                  className="flex w-full items-center gap-2 text-sm"
                >
                  <input type="hidden" name="setId" value={set.id} />
                  <input type="hidden" name="workoutId" value={workoutId} />

                  {category === ExerciseCategory.STRENGTH && (
                    <>
                      <input
                        name="reps"
                        type="number"
                        placeholder="Reps"
                        defaultValue={set.reps ?? ""}
                        className="w-14 rounded-md border px-2 py-1"
                      />

                      <input
                        name="weight"
                        type="number"
                        step="0.5"
                        placeholder="Weight"
                        defaultValue={set.weight ?? ""}
                        className="w-20 rounded-md border px-2 py-1"
                      />

                      <input
                        name="rpe"
                        type="number"
                        step="0.5"
                        placeholder="RPE"
                        defaultValue={set.rpe ?? ""}
                        className="w-20 rounded-md border px-2 py-1"
                      />
                    </>
                  )}

                  {category === ExerciseCategory.CARDIO && (
                    <>
                      <input
                        name="duration"
                        type="number"
                        placeholder="Duration (min)"
                        defaultValue={set.duration ?? ""}
                        className="w-28 rounded-md border px-2 py-1"
                      />

                      <input
                        name="distance"
                        type="number"
                        step="0.01"
                        placeholder="Distance"
                        defaultValue={set.distance ?? ""}
                        className="w-28 rounded-md border px-2 py-1"
                      />
                    </>
                  )}

                  <input
                    name="notes"
                    type="text"
                    placeholder="Notes"
                    defaultValue={set.notes ?? ""}
                    className="flex-1 rounded-md border px-2 py-1"
                  />

                  <button
                    type="submit"
                    className="text-xs font-medium hover:underline"
                  >
                    Save
                  </button>

                  <button
                    type="submit"
                    formAction={deleteSet}
                    className="text-xs text-red-600 hover:underline"
                  >
                    Delete
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditingSetId(null)}
                    className="text-xs text-muted-foreground hover:underline"
                  >
                    Cancel
                  </button>
                </form>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
