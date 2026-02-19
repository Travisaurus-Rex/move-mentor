import { prisma } from "@/lib/prisma";
import { getUser } from "../auth/auth";
import {
  Exercise,
  Period,
  Workout,
  WorkoutWithExercisesAndSets,
} from "@/lib/types";
import { notFound } from "next/navigation";
import { fromKg, fromKm } from "../utils";
import { UnitSystem } from "@prisma/client";

function periodToDate(period: Period): Date | null {
  if (period === "ALL") return null;
  const days =
    period === "1W"
      ? 7
      : period === "2W"
        ? 14
        : period === "1M"
          ? 30
          : period === "3M"
            ? 90
            : 180;
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
}

export async function getWorkoutById(
  id: string,
  userId: string,
  unitSystem: UnitSystem,
): Promise<WorkoutWithExercisesAndSets> {
  const workout = await prisma.workout.findFirst({
    where: { id, userId },
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

  return {
    ...workout,
    exercises: workout.exercises.map((we) => ({
      ...we,
      sets: we.sets.map((set) => ({
        ...set,
        weight: set.weight !== null ? fromKg(set.weight, unitSystem) : null,
        distance:
          set.distance !== null ? fromKm(set.distance, unitSystem) : null,
      })),
    })),
  };
}

export async function getUserWorkouts(userId: string): Promise<Workout[]> {
  return prisma.workout.findMany({
    where: { userId },
    orderBy: { date: "desc" },
  });
}

export async function getUserWorkoutsCount(userId: string): Promise<number> {
  return prisma.workout.count({ where: { userId } });
}

export async function getUserExercisesCount(userId: string): Promise<number> {
  return prisma.workoutExercise.count({
    where: { workout: { userId } },
  });
}

export async function getStrengthExercisesCount(
  userId: string,
): Promise<number> {
  return prisma.workoutExercise.count({
    where: {
      workout: { userId },
      exercise: { category: "STRENGTH" },
    },
  });
}

export async function getCardioExercisesCount(userId: string): Promise<number> {
  return prisma.workoutExercise.count({
    where: {
      workout: { userId },
      exercise: { category: "CARDIO" },
    },
  });
}

export async function getAllExercises(): Promise<Exercise[]> {
  return prisma.exercise.findMany({ orderBy: { name: "asc" } });
}

export async function getTotalVolume(
  period: Period = "ALL",
  userId: string,
  unitSystem: UnitSystem,
): Promise<number> {
  const since = periodToDate(period);

  const sets = await prisma.set.findMany({
    where: {
      workoutExercise: {
        workout: {
          userId,
          ...(since ? { date: { gte: since } } : {}),
        },
      },
      reps: { not: null },
      weight: { not: null },
    },
    select: { reps: true, weight: true },
  });

  const totalKg = sets.reduce((acc, set) => acc + set.reps! * set.weight!, 0);
  return fromKg(totalKg, unitSystem);
}

export async function getTotalCardioMinutes(
  period: Period = "ALL",
  userId: string,
): Promise<number> {
  const since = periodToDate(period);

  const sets = await prisma.set.findMany({
    where: {
      workoutExercise: {
        workout: {
          userId,
          ...(since ? { date: { gte: since } } : {}),
        },
      },
      duration: { not: null },
    },
    select: { duration: true },
  });

  return sets.reduce((acc, set) => acc + set.duration!, 0);
}

export async function getWorkoutsPerWeek(
  period: Period,
  userId: string,
): Promise<{ week: string; count: number }[]> {
  const since =
    period === "ALL"
      ? new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
      : periodToDate(period)!;

  const workouts = await prisma.workout.findMany({
    where: { userId, date: { gte: since } },
    select: { date: true },
    orderBy: { date: "asc" },
  });

  const weeks: Record<string, number> = {};

  for (const workout of workouts) {
    const d = new Date(workout.date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(d.setDate(diff));
    const label = monday.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    weeks[label] = (weeks[label] ?? 0) + 1;
  }

  return Object.entries(weeks).map(([week, count]) => ({ week, count }));
}

export async function getDashboardStats(userId: string) {
  const [workoutCount, exerciseCount, lastWorkout, recentWorkoutCount] =
    await Promise.all([
      prisma.workout.count({ where: { userId } }),
      prisma.workoutExercise.count({
        where: { workout: { userId } },
      }),
      prisma.workout.findFirst({
        where: { userId },
        orderBy: { date: "desc" },
        select: { date: true },
      }),
      prisma.workout.count({
        where: {
          userId,
          date: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
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

export async function getUserWorkoutsWithStats(
  userId: string,
  unitSystem: UnitSystem,
) {
  const workouts = await prisma.workout.findMany({
    where: { userId },
    orderBy: { date: "desc" },
    include: {
      exercises: {
        include: {
          exercise: { select: { name: true, category: true } },
          sets: true,
        },
      },
    },
  });

  return workouts.map((workout) => {
    const exerciseCount = workout.exercises.length;
    const totalSets = workout.exercises.reduce(
      (acc, we) => acc + we.sets.length,
      0,
    );
    const totalVolumeKg = workout.exercises.reduce(
      (acc, we) =>
        acc +
        we.sets.reduce((s, set) => s + (set.reps ?? 0) * (set.weight ?? 0), 0),
      0,
    );
    const totalVolume = fromKg(totalVolumeKg, unitSystem);
    const totalCardioMinutes = workout.exercises.reduce(
      (acc, we) => acc + we.sets.reduce((s, set) => s + (set.duration ?? 0), 0),
      0,
    );
    const exerciseNames = workout.exercises
      .map((we) => we.exercise.name)
      .slice(0, 3)
      .join(", ");
    const hasMore = workout.exercises.length > 3;

    return {
      id: workout.id,
      date: workout.date,
      notes: workout.notes,
      exerciseCount,
      totalSets,
      totalVolume,
      totalCardioMinutes,
      exerciseNames: hasMore
        ? `${exerciseNames} +${workout.exercises.length - 3} more`
        : exerciseNames,
    };
  });
}
