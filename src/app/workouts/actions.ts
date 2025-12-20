"use server";

import { getUser } from "@/lib/auth/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createWorkout(params: {
  date: string;
  notes: string;
}): Promise<string> {
  const user = await getUser();

  let createdUser = await prisma.workout.create({
    data: {
      date: new Date(params.date),
      notes: params.notes,
      userId: user.id,
    },
  });

  return createdUser.id;
}

export async function addExerciseToWorkout(formData: FormData): Promise<void> {
  const user = await getUser();

  const workoutId = formData.get("workoutId") as string;
  const exerciseId = formData.get("exerciseId") as string;

  if (!workoutId || !exerciseId) return;

  const nextOrder = await prisma.workoutExercise.count({
    where: { workoutId },
  });

  const workout = await prisma.workout.findFirst({
    where: { id: workoutId, userId: user.id },
    select: { id: true },
  });

  if (!workout) return;

  await prisma.workoutExercise.create({
    data: {
      workoutId,
      exerciseId,
      order: nextOrder,
    },
  });

  redirect(`/workouts/${workoutId}`);
}
