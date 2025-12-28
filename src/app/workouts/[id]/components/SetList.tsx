"use client";

import { useState } from "react";
import type { Set } from "@/lib/types";
import { updateSet } from "../../actions";

type Props = {
  sets: Set[];
  workoutId: string;
};

export function SetList({ sets, workoutId }: Props) {
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
          <li key={set.id} className="relative bg-background">
            <div className="min-h-[2.25rem] flex items-center">
              {!isEditing ? (
                <div className="flex w-full items-center gap-3 text-sm">
                  <span className="w-12 text-muted-foreground">
                    Set {index + 1}
                  </span>

                  <span className="flex-1 truncate">
                    {set.weight ?? "—"} × {set.reps ?? "—"}
                    {set.rpe ? ` (RPE ${set.rpe})` : ""}
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

                  <input
                    name="reps"
                    placeholder="Reps"
                    type="number"
                    defaultValue={set.reps ?? ""}
                    className="w-14 rounded-md border px-2 py-1"
                  />

                  <input
                    name="weight"
                    placeholder="Weight"
                    type="number"
                    step="0.5"
                    defaultValue={set.weight ?? ""}
                    className="w-20 rounded-md border px-2 py-1"
                  />

                  <input
                    name="rpe"
                    placeholder="RPE"
                    type="number"
                    step="0.5"
                    defaultValue={set.rpe ?? ""}
                    className="w-20 rounded-md border px-2 py-1"
                  />

                  <input
                    name="notes"
                    type="text"
                    defaultValue={set.notes ?? ""}
                    placeholder="Notes"
                    className="flex-1 rounded-md border px-2 py-1"
                  />

                  <button
                    type="submit"
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    Save
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
