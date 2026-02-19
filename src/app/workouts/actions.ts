"use server";

import { ExerciseCategory } from "@prisma/client";
import { getUser } from "@/lib/auth/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { toKg, toKm } from "@/lib/utils";
import { getUserUnitSystem } from "@/lib/queries/user-profile";

export async function createWorkout(params: {
  date: string;
  notes: string;
}): Promise<string> {
  const user = await getUser();

  const createdUser = await prisma.workout.create({
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

export async function addSetToExercise(formData: FormData) {
  const user = await getUser();

  const workoutId = formData.get("workoutId") as string | null;
  const workoutExerciseId = formData.get("workoutExerciseId") as string | null;

  if (!workoutId || !workoutExerciseId) return;

  const [workoutExercise, unitSystem] = await Promise.all([
    prisma.workoutExercise.findFirst({
      where: {
        id: workoutExerciseId,
        workout: { userId: user.id },
      },
      include: {
        exercise: {
          select: { category: true },
        },
      },
    }),
    getUserUnitSystem(user.id),
  ]);

  if (!workoutExercise) return;

  const category = workoutExercise.exercise.category;

  if (category === ExerciseCategory.STRENGTH) {
    const repsRaw = formData.get("reps");
    if (!repsRaw) return;

    const reps = Number(repsRaw);
    if (!Number.isFinite(reps) || reps <= 0) return;

    const weightRaw = formData.get("weight");
    const rpeRaw = formData.get("rpe");
    const notesRaw = formData.get("notes");

    await prisma.set.create({
      data: {
        workoutExerciseId,
        reps,
        weight: weightRaw ? toKg(Number(weightRaw), unitSystem) : null,
        rpe: rpeRaw ? Number(rpeRaw) : null,
        notes: notesRaw ? String(notesRaw) : null,
      },
    });
  }

  if (category === ExerciseCategory.CARDIO) {
    const durationRaw = formData.get("duration");
    if (!durationRaw) return;

    const duration = Number(durationRaw);
    if (!Number.isFinite(duration) || duration <= 0) return;

    const distanceRaw = formData.get("distance");
    const notesRaw = formData.get("notes");

    await prisma.set.create({
      data: {
        workoutExerciseId,
        duration,
        distance: distanceRaw ? toKm(Number(distanceRaw), unitSystem) : null,
        notes: notesRaw ? String(notesRaw) : null,
      },
    });
  }

  redirect(`/workouts/${workoutId}`);
}

export async function updateSet(formData: FormData) {
  const user = await getUser();

  const setId = formData.get("setId") as string | null;
  const workoutId = formData.get("workoutId") as string | null;
  if (!setId || !workoutId) return;

  const [set, unitSystem] = await Promise.all([
    prisma.set.findFirst({
      where: {
        id: setId,
        workoutExercise: {
          workout: { userId: user.id },
        },
      },
      include: {
        workoutExercise: {
          include: {
            exercise: { select: { category: true } },
          },
        },
      },
    }),
    getUserUnitSystem(user.id),
  ]);

  if (!set) return;

  const category = set.workoutExercise.exercise.category;

  if (category === ExerciseCategory.STRENGTH) {
    const reps = formData.get("reps");
    const weight = formData.get("weight");
    const rpe = formData.get("rpe");
    const notes = formData.get("notes");

    await prisma.set.update({
      where: { id: setId },
      data: {
        reps: reps ? Number(reps) : null,
        weight: weight ? toKg(Number(weight), unitSystem) : null,
        rpe: rpe ? Number(rpe) : null,
        notes: notes ? String(notes) : null,
        duration: null,
        distance: null,
      },
    });
  }

  if (category === ExerciseCategory.CARDIO) {
    const duration = formData.get("duration");
    const distance = formData.get("distance");
    const notes = formData.get("notes");

    if (!duration) return;

    await prisma.set.update({
      where: { id: setId },
      data: {
        duration: Number(duration),
        distance: distance ? toKm(Number(distance), unitSystem) : null,
        notes: notes ? String(notes) : null,
        reps: null,
        weight: null,
        rpe: null,
      },
    });
  }

  redirect(`/workouts/${workoutId}`);
}

export async function deleteSet(formData: FormData) {
  const user = await getUser();

  const setId = formData.get("setId") as string;
  const workoutId = formData.get("workoutId") as string;

  if (!setId || !workoutId) return;

  const set = await prisma.set.findFirst({
    where: {
      id: setId,
      workoutExercise: {
        workout: { userId: user.id },
      },
    },
    select: { id: true },
  });

  if (!set) return;

  await prisma.set.delete({
    where: { id: setId },
  });

  redirect(`/workouts/${workoutId}`);
}

export async function deleteExerciseFromWorkout(formData: FormData) {
  const user = await getUser();

  const workoutExerciseId = formData.get("workoutExerciseId") as string;
  const workoutId = formData.get("workoutId") as string;

  if (!workoutExerciseId || !workoutId) return;

  const we = await prisma.workoutExercise.findFirst({
    where: {
      id: workoutExerciseId,
      workout: { userId: user.id },
    },
    select: { id: true },
  });

  if (!we) return;

  await prisma.set.deleteMany({
    where: { workoutExerciseId },
  });

  await prisma.workoutExercise.delete({
    where: { id: workoutExerciseId },
  });

  redirect(`/workouts/${workoutId}`);
}

export async function deleteWorkout(formData: FormData) {
  const user = await getUser();

  const workoutId = formData.get("workoutId") as string;
  if (!workoutId) return;

  const workout = await prisma.workout.findFirst({
    where: { id: workoutId, userId: user.id },
    select: { id: true },
  });

  if (!workout) return;

  await prisma.set.deleteMany({
    where: { workoutExercise: { workoutId } },
  });

  await prisma.workoutExercise.deleteMany({
    where: { workoutId },
  });

  await prisma.workout.delete({
    where: { id: workoutId },
  });

  redirect("/workouts");
}
