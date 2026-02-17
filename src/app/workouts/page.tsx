import Link from "next/link";
import { getUserWorkoutsWithStats } from "@/lib/queries/workouts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { deleteWorkout } from "./actions";

export default async function WorkoutsPage() {
  const workouts = await getUserWorkoutsWithStats();

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Workouts</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {workouts.length} total workout{workouts.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button asChild>
          <Link href="/workouts/new">
            <Plus className="h-4 w-4 mr-2" />
            New workout
          </Link>
        </Button>
      </div>

      {workouts.length === 0 ? (
        <div className="rounded-xl border bg-card p-16 text-center">
          <p className="text-muted-foreground text-sm">No workouts yet.</p>
          <Button asChild className="mt-4">
            <Link href="/workouts/new">Log your first workout</Link>
          </Button>
        </div>
      ) : (
        <div className="rounded-xl border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Exercises</TableHead>
                <TableHead className="text-right">Sets</TableHead>
                <TableHead className="text-right">Volume</TableHead>
                <TableHead className="text-right">Cardio</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead />
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {workouts.map((w) => (
                <TableRow key={w.id} className="group">
                  <TableCell className="font-medium whitespace-nowrap">
                    {w.date.toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {w.exerciseNames || <span className="italic">None</span>}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="secondary">{w.totalSets}</Badge>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {w.totalVolume > 0 ? (
                      `${(w.totalVolume / 1000).toFixed(1)}k kg`
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {w.totalCardioMinutes > 0 ? (
                      `${w.totalCardioMinutes} min`
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="max-w-[180px] truncate text-sm text-muted-foreground">
                    {w.notes ?? <span className="italic">—</span>}
                  </TableCell>
                  <TableCell>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Link href={`/workouts/${w.id}`}>Open →</Link>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <form action={deleteWorkout}>
                      <input type="hidden" name="workoutId" value={w.id} />
                      <Button
                        type="submit"
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </form>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
