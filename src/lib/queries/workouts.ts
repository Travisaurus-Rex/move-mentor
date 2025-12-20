import { prisma } from "@/lib/prisma";
import { getUser } from "../auth/auth";
import { Workout } from "@/generated/prisma/client";
import { notFound } from "next/navigation";

export async function getWorkoutById(id: string) {
  const user = await getUser();

  const workout = await prisma.workout.findFirst({
    where: { id, userId: user.id },
    include: {
      exercises: {
        include: {
          exercise: true,
        },
      },
    },
  });

  if (!workout) notFound();
  return workout;
}

export async function getUserWorkouts(): Promise<Workout[]> {
  const user = await getUser();

  return prisma.workout.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      date: "desc",
    },
  });
}

export async function getUserWorkoutsCount(): Promise<number> {
  const { id } = await getUser();

  return await prisma.workout.count({
    where: {
      userId: id,
    },
  });
}

export async function getUserExercisesCount(): Promise<number> {
  const { id } = await getUser();

  return await prisma.workoutExercise.count({
    where: {
      workout: { userId: id },
    },
  });
}

export async function getAllExercises() {
  return prisma.exercise.findMany({ orderBy: { name: "asc" } });
}
