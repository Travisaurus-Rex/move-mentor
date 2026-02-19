"use server";

import { getUser } from "@/lib/auth/auth";
import { prisma } from "@/lib/prisma";
import { UnitSystem } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateUserProfile(formData: FormData) {
  const user = await getUser();

  const displayName = formData.get("displayName") as string | null;
  const unitSystem = formData.get("unitSystem") as UnitSystem | null;

  if (unitSystem && !Object.values(UnitSystem).includes(unitSystem)) {
    throw new Error("Invalid unit system");
  }

  await prisma.userProfile.upsert({
    where: { userId: user.id },
    update: {
      ...(displayName !== null && { displayName }),
      ...(unitSystem !== null && { unitSystem }),
    },
    create: {
      userId: user.id,
      displayName: displayName ?? null,
      unitSystem: unitSystem ?? UnitSystem.METRIC,
    },
  });

  revalidatePath("/settings");
}

export async function deleteAccount() {
  const user = await getUser();

  await prisma.set.deleteMany({
    where: { workoutExercise: { workout: { userId: user.id } } },
  });

  await prisma.workoutExercise.deleteMany({
    where: { workout: { userId: user.id } },
  });

  await prisma.workout.deleteMany({
    where: { userId: user.id },
  });

  await prisma.userProfile.deleteMany({
    where: { userId: user.id },
  });

  await prisma.session.deleteMany({
    where: { userId: user.id },
  });

  await prisma.account.deleteMany({
    where: { userId: user.id },
  });

  await prisma.user.delete({
    where: { id: user.id },
  });
}
