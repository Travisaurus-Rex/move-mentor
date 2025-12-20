import { getWorkoutById } from "@/lib/queries/workouts";

type PageProps = {
    params: {
        id: string;
    }
}

export default async function Workout({ params: { id } }: PageProps) {
    const workout = await getWorkoutById(id);
    return <main style={{ padding: 24 }}>
        <h1>Workout</h1>

        <p>
            <strong>Date:</strong>{' '}
            {workout.date.toDateString()}
        </p>

        {workout.notes && (
            <p>
            <strong>Notes:</strong> {workout.notes}
            </p>
        )}
    </main>
}