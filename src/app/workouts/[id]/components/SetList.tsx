export function SetList({ sets }: { sets: any[] }) {
  if (sets.length === 0) {
    return (
      <p className="mt-2 text-sm text-muted-foreground">No sets logged yet.</p>
    );
  }

  return (
    <ul className="mt-3 space-y-1 text-sm">
      {sets.map((set, index) => (
        <li key={set.id} className="flex gap-2">
          <span className="text-muted-foreground">Set {index + 1}:</span>
          <span>
            {set.weight ?? "—"} × {set.reps ?? "—"}
            {set.rpe ? ` (RPE ${set.rpe})` : ""}
            {set.notes ? ` — ${set.notes}` : ""}
          </span>
        </li>
      ))}
    </ul>
  );
}
