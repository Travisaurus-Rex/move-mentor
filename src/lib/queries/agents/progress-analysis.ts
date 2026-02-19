import { getUser } from "@/lib/auth/auth";
import { prisma } from "@/lib/prisma";
import { getTotalCardioMinutes, getTotalVolume } from "../workouts";
import { Period } from "@/lib/types";

function getWeekLabel(date: Date): string {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(d.setDate(diff));
  return monday.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/**
 * Get personal records (max weight for strength, max duration/distance for cardio)
 * @param exerciseName Optional filter by specific exercise
 */
export async function getPersonalRecords(exerciseName?: string) {
  const { id } = await getUser();

  // Get all exercises with their best sets
  const workoutExercises = await prisma.workoutExercise.findMany({
    where: {
      workout: { userId: id },
      ...(exerciseName
        ? {
            exercise: { name: { contains: exerciseName, mode: "insensitive" } },
          }
        : {}),
    },
    include: {
      exercise: { select: { name: true, category: true } },
      sets: {
        select: {
          reps: true,
          weight: true,
          duration: true,
          distance: true,
          createdAt: true,
        },
      },
      workout: { select: { date: true } },
    },
  });

  // Group by exercise and find max values
  const recordsMap = new Map<
    string,
    {
      exerciseName: string;
      category: string;
      maxWeight?: number;
      maxWeightDate?: Date;
      maxDuration?: number;
      maxDurationDate?: Date;
      maxDistance?: number;
      maxDistanceDate?: Date;
    }
  >();

  for (const we of workoutExercises) {
    const key = we.exercise.name;
    const existing = recordsMap.get(key);

    for (const set of we.sets) {
      if (we.exercise.category === "STRENGTH" && set.weight && set.reps) {
        if (
          !existing ||
          !existing.maxWeight ||
          set.weight > existing.maxWeight
        ) {
          recordsMap.set(key, {
            exerciseName: we.exercise.name,
            category: we.exercise.category,
            maxWeight: set.weight,
            maxWeightDate: we.workout.date,
            maxDuration: existing?.maxDuration,
            maxDurationDate: existing?.maxDurationDate,
            maxDistance: existing?.maxDistance,
            maxDistanceDate: existing?.maxDistanceDate,
          });
        }
      }

      if (we.exercise.category === "CARDIO") {
        const current = recordsMap.get(key) || {
          exerciseName: we.exercise.name,
          category: we.exercise.category,
        };

        if (
          set.duration &&
          (!current.maxDuration || set.duration > current.maxDuration)
        ) {
          current.maxDuration = set.duration;
          current.maxDurationDate = we.workout.date;
        }

        if (
          set.distance &&
          (!current.maxDistance || set.distance > current.maxDistance)
        ) {
          current.maxDistance = set.distance;
          current.maxDistanceDate = we.workout.date;
        }

        recordsMap.set(key, current);
      }
    }
  }

  return Array.from(recordsMap.values());
}

/**
 * Get volume/duration progression for a specific exercise over time
 * @param exerciseName Exercise name
 * @param weeks Number of weeks to look back
 */
export async function getVolumeProgression(
  exerciseName: string,
  weeks: number,
) {
  const { id } = await getUser();
  const since = new Date(Date.now() - weeks * 7 * 24 * 60 * 60 * 1000);

  // Get exercise category
  const exercise = await prisma.exercise.findFirst({
    where: { name: { contains: exerciseName, mode: "insensitive" } },
    select: { id: true, name: true, category: true },
  });

  if (!exercise) return [];

  // Get all sets for this exercise
  const workoutExercises = await prisma.workoutExercise.findMany({
    where: {
      exerciseId: exercise.id,
      workout: { userId: id, date: { gte: since } },
    },
    include: {
      sets: {
        select: {
          reps: true,
          weight: true,
          duration: true,
        },
      },
      workout: { select: { date: true } },
    },
  });

  // Group by week and calculate volume/duration
  const weeklyData: Record<string, number> = {};

  for (const we of workoutExercises) {
    const weekLabel = getWeekLabel(we.workout.date);

    for (const set of we.sets) {
      if (exercise.category === "STRENGTH" && set.reps && set.weight) {
        weeklyData[weekLabel] =
          (weeklyData[weekLabel] ?? 0) + set.reps * set.weight;
      } else if (exercise.category === "CARDIO" && set.duration) {
        weeklyData[weekLabel] = (weeklyData[weekLabel] ?? 0) + set.duration;
      }
    }
  }

  const unit = exercise.category === "STRENGTH" ? "kg" : "min";

  return Object.entries(weeklyData)
    .map(([week, value]) => ({ week, value, unit }))
    .sort((a, b) => {
      // Sort chronologically
      const dateA = new Date(a.week + " 2026");
      const dateB = new Date(b.week + " 2026");
      return dateA.getTime() - dateB.getTime();
    });
}

/**
 * Get summary of recent workouts
 * @param count Number of recent workouts to retrieve
 */
export async function getRecentWorkoutSummary(count: number) {
  const { id } = await getUser();

  const workouts = await prisma.workout.findMany({
    where: { userId: id },
    orderBy: { date: "desc" },
    take: count,
    include: {
      exercises: {
        include: {
          exercise: { select: { name: true } },
          sets: true,
        },
      },
    },
  });

  return workouts.map((w) => ({
    date: w.date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }),
    exercises: w.exercises.map((e) => e.exercise.name),
    totalSets: w.exercises.reduce((acc, e) => acc + e.sets.length, 0),
    notes: w.notes,
  }));
}

/**
 * Get exercise frequency (which exercises are done most often)
 * @param weeks Number of weeks to analyze
 */
export async function getExerciseFrequency(weeks: number) {
  const { id } = await getUser();
  const since = new Date(Date.now() - weeks * 7 * 24 * 60 * 60 * 1000);

  const workoutExercises = await prisma.workoutExercise.findMany({
    where: {
      workout: { userId: id, date: { gte: since } },
    },
    include: {
      exercise: { select: { name: true, category: true } },
    },
  });

  // Count occurrences
  const frequencyMap = new Map<
    string,
    { exerciseName: string; category: string; count: number }
  >();

  for (const we of workoutExercises) {
    const key = we.exercise.name;
    const existing = frequencyMap.get(key);

    if (existing) {
      existing.count++;
    } else {
      frequencyMap.set(key, {
        exerciseName: we.exercise.name,
        category: we.exercise.category,
        count: 1,
      });
    }
  }

  return Array.from(frequencyMap.values()).sort((a, b) => b.count - a.count);
}

/**
 * Get exercises with no improvement (plateau detection)
 * @param weeks Number of weeks to check for stagnation
 */
export async function getStagnantExercises(weeks: number) {
  const { id } = await getUser();
  const cutoffDate = new Date(Date.now() - weeks * 7 * 24 * 60 * 60 * 1000);

  // Get all exercises user has done
  const allWorkoutExercises = await prisma.workoutExercise.findMany({
    where: { workout: { userId: id } },
    include: {
      exercise: { select: { name: true, category: true } },
      sets: {
        select: {
          reps: true,
          weight: true,
          duration: true,
          distance: true,
        },
      },
      workout: { select: { date: true } },
    },
  });

  // Group by exercise
  const exerciseMap = new Map<
    string,
    {
      category: string;
      historicalBest: number;
      recentBest: number;
      historicalBestDate: Date;
      recentBestDate: Date | null;
    }
  >();

  for (const we of allWorkoutExercises) {
    const key = we.exercise.name;
    const isRecent = we.workout.date >= cutoffDate;

    for (const set of we.sets) {
      let value = 0;

      if (we.exercise.category === "STRENGTH" && set.weight && set.reps) {
        value = set.weight;
      } else if (we.exercise.category === "CARDIO") {
        value = set.duration || set.distance || 0;
      }

      if (value === 0) continue;

      const existing = exerciseMap.get(key);

      if (!existing) {
        exerciseMap.set(key, {
          category: we.exercise.category,
          historicalBest: value,
          recentBest: isRecent ? value : 0,
          historicalBestDate: we.workout.date,
          recentBestDate: isRecent ? we.workout.date : null,
        });
      } else {
        if (value > existing.historicalBest) {
          existing.historicalBest = value;
          existing.historicalBestDate = we.workout.date;
        }
        if (isRecent && value > existing.recentBest) {
          existing.recentBest = value;
          existing.recentBestDate = we.workout.date;
        }
      }
    }
  }

  // Find stagnant exercises (recent best <= historical best from before cutoff)
  const stagnant: Array<{
    exerciseName: string;
    category: string;
    weeksSinceImprovement: number;
  }> = [];

  for (const [exerciseName, data] of exerciseMap.entries()) {
    // If no recent activity or recent best is less than historical best from before cutoff
    if (
      data.recentBest === 0 ||
      (data.recentBest <= data.historicalBest &&
        data.historicalBestDate < cutoffDate)
    ) {
      const weeksSince = data.recentBestDate
        ? Math.floor(
            (Date.now() - data.recentBestDate.getTime()) /
              (7 * 24 * 60 * 60 * 1000),
          )
        : weeks;

      stagnant.push({
        exerciseName,
        category: data.category,
        weeksSinceImprovement: weeksSince,
      });
    }
  }

  return stagnant;
}

/**
 * Get cardio distance progression over time
 * @param exerciseName Cardio exercise name
 * @param weeks Number of weeks to look back
 */
export async function getCardioDistanceProgression(
  exerciseName: string,
  weeks: number,
) {
  const { id } = await getUser();
  const since = new Date(Date.now() - weeks * 7 * 24 * 60 * 60 * 1000);

  const exercise = await prisma.exercise.findFirst({
    where: {
      name: { contains: exerciseName, mode: "insensitive" },
      category: "CARDIO",
    },
    select: { id: true },
  });

  if (!exercise) return [];

  const workoutExercises = await prisma.workoutExercise.findMany({
    where: {
      exerciseId: exercise.id,
      workout: { userId: id, date: { gte: since } },
    },
    include: {
      sets: {
        where: { distance: { not: null } },
        select: { distance: true },
      },
      workout: { select: { date: true } },
    },
  });

  const weeklyData: Record<string, number> = {};

  for (const we of workoutExercises) {
    const weekLabel = getWeekLabel(we.workout.date);
    for (const set of we.sets) {
      weeklyData[weekLabel] =
        (weeklyData[weekLabel] ?? 0) + (set.distance ?? 0);
    }
  }

  return Object.entries(weeklyData)
    .map(([week, totalDistance]) => ({ week, totalDistance }))
    .sort((a, b) => {
      const dateA = new Date(a.week + " 2026");
      const dateB = new Date(b.week + " 2026");
      return dateA.getTime() - dateB.getTime();
    });
}

/**
 * Get cardio-specific personal records
 * @param exerciseName Optional filter by exercise
 */
export async function getCardioRecords(exerciseName?: string) {
  const { id } = await getUser();

  const workoutExercises = await prisma.workoutExercise.findMany({
    where: {
      workout: { userId: id },
      exercise: {
        category: "CARDIO",
        ...(exerciseName
          ? { name: { contains: exerciseName, mode: "insensitive" } }
          : {}),
      },
    },
    include: {
      exercise: { select: { name: true } },
      sets: {
        select: { duration: true, distance: true },
      },
      workout: { select: { date: true } },
    },
  });

  const recordsMap = new Map<
    string,
    {
      exerciseName: string;
      maxDuration: number;
      maxDurationDate: Date;
      maxDistance: number;
      maxDistanceDate: Date;
    }
  >();

  for (const we of workoutExercises) {
    const key = we.exercise.name;
    const existing = recordsMap.get(key);

    for (const set of we.sets) {
      const current = existing || {
        exerciseName: we.exercise.name,
        maxDuration: 0,
        maxDurationDate: we.workout.date,
        maxDistance: 0,
        maxDistanceDate: we.workout.date,
      };

      if (set.duration && set.duration > current.maxDuration) {
        current.maxDuration = set.duration;
        current.maxDurationDate = we.workout.date;
      }

      if (set.distance && set.distance > current.maxDistance) {
        current.maxDistance = set.distance;
        current.maxDistanceDate = we.workout.date;
      }

      recordsMap.set(key, current);
    }
  }

  return Array.from(recordsMap.values());
}

/**
 * Get training balance (cardio vs strength distribution)
 * @param weeks Number of weeks to analyze
 */
export async function getTrainingBalance(weeks: number) {
  const { id } = await getUser();
  const since = new Date(Date.now() - weeks * 7 * 24 * 60 * 60 * 1000);

  // Count workouts containing cardio
  const cardioWorkouts = await prisma.workout.count({
    where: {
      userId: id,
      date: { gte: since },
      exercises: {
        some: { exercise: { category: "CARDIO" } },
      },
    },
  });

  // Count workouts containing strength
  const strengthWorkouts = await prisma.workout.count({
    where: {
      userId: id,
      date: { gte: since },
      exercises: {
        some: { exercise: { category: "STRENGTH" } },
      },
    },
  });

  // Map weeks to Period type
  const period: Period =
    weeks === 7
      ? "1W"
      : weeks === 14
        ? "2W"
        : weeks === 30
          ? "1M"
          : weeks === 90
            ? "3M"
            : weeks === 180
              ? "6M"
              : "ALL";

  const totalCardioMinutes = await getTotalCardioMinutes(period);
  const totalStrengthVolume = await getTotalVolume(period);

  const totalWorkouts = cardioWorkouts + strengthWorkouts;
  const cardioPercentage =
    totalWorkouts > 0 ? Math.round((cardioWorkouts / totalWorkouts) * 100) : 0;

  return {
    cardioWorkouts,
    strengthWorkouts,
    totalCardioMinutes,
    totalStrengthVolume,
    cardioPercentage,
  };
}
