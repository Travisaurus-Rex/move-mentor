import { prisma } from "@/lib/prisma";
import { getUser } from "../auth/auth";
import { Exercise, Workout } from "@/generated/prisma/client";
import { notFound } from "next/navigation";
import { WorkoutWithExercisesAndSets } from "../types";

export async function getWorkoutById(
  id: string
): Promise<WorkoutWithExercisesAndSets> {
  const user = await getUser();

  const workout = await prisma.workout.findFirst({
    where: { id, userId: user.id },
    include: {
      exercises: {
        orderBy: { order: "asc" },
        include: {
          exercise: true,
          sets: {
            orderBy: { createdAt: "asc" },
          },
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

export async function getAllExercises(): Promise<Exercise[]> {
  return await prisma.exercise.findMany({ orderBy: { name: "asc" } });
}

export async function getDashboardStats() {
  const user = await getUser();

  const [workoutCount, exerciseCount, lastWorkout, recentWorkoutCount] =
    await Promise.all([
      prisma.workout.count({ where: { userId: user.id } }),
      prisma.workoutExercise.count({
        where: { workout: { userId: user.id } },
      }),
      prisma.workout.findFirst({
        where: { userId: user.id },
        orderBy: { date: "desc" },
        select: { date: true },
      }),
      prisma.workout.count({
        where: {
          userId: user.id,
          date: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      }),
    ]);

  return {
    workoutCount,
    exerciseCount,
    lastWorkoutDate: lastWorkout?.date ?? null,
    workoutsLast7Days: recentWorkoutCount,
  };
}
