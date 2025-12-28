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

export async function addSetToExercise(formData: FormData) {
  const user = await getUser();

  const workoutId = formData.get("workoutId") as string;
  const workoutExerciseId = formData.get("workoutExerciseId") as string;

  const reps = Number(formData.get("reps"));
  const weight = formData.get("weight") ? Number(formData.get("weight")) : null;
  const rpe = formData.get("rpe") ? Number(formData.get("rpe")) : null;
  const notes = (formData.get("notes") as string) || null;

  if (!workoutId || !workoutExerciseId || !reps) return;

  const we = await prisma.workoutExercise.findFirst({
    where: {
      id: workoutExerciseId,
      workout: { userId: user.id },
    },
    select: { id: true },
  });
  if (!we) return;

  await prisma.set.create({
    data: {
      workoutExerciseId,
      reps,
      weight,
      rpe,
      notes,
    },
  });

  redirect(`/workouts/${workoutId}`);
}

export async function updateSet(formData: FormData) {
  const user = await getUser();

  const setId = formData.get("setId") as string;
  const workoutId = formData.get("workoutId") as string;

  const reps = formData.get("reps");
  const weight = formData.get("weight");
  const rpe = formData.get("rpe");
  const notes = formData.get("notes");

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

  await prisma.set.update({
    where: { id: setId },
    data: {
      reps: reps ? Number(reps) : null,
      weight: weight ? Number(weight) : null,
      rpe: rpe ? Number(rpe) : null,
      notes: notes ? String(notes) : null,
    },
  });

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
