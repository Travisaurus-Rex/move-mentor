import { getAllExercises, getWorkoutById } from "@/lib/queries/workouts";
import { WorkoutHeader } from "./components/WorkoutHeader";
import { AddExerciseForm } from "./components/AddExerciseForm";
import { ExerciseList } from "./components/ExerciseList";
import { getUserWithProfile } from "@/lib/queries/user-profile";

type Props = { params: { id: string } };

export default async function WorkoutPage({ params }: Props) {
  const { id } = await params;
  const { id: userId, profile } = await getUserWithProfile();
  const [workout, exercises] = await Promise.all([
    getWorkoutById(id, userId, profile.unitSystem),
    getAllExercises(),
  ]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-8 space-y-8">
      <WorkoutHeader workout={workout} />
      <AddExerciseForm workoutId={workout.id} exercises={exercises} />
      <ExerciseList exercises={workout.exercises} workoutId={workout.id} />
    </div>
  );
}
