// src/app/onboarding/actions.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth/auth";
import type { OnboardingData } from "@/lib/types/onboarding";

export async function completeOnboarding(data: OnboardingData) {
  const user = await getUser();

  if (!user) {
    redirect("/api/auth/signin");
  }

  // ── Validation ──────────────────────────────────────────────────────────
  if (!data.displayName?.trim()) {
    throw new Error("Display name is required");
  }
  if (!data.age || data.age < 13 || data.age > 120) {
    throw new Error("Please enter a valid age");
  }
  if (!data.weightKg || data.weightKg < 20 || data.weightKg > 500) {
    throw new Error("Please enter a valid weight");
  }
  if (!data.goals || data.goals.length === 0) {
    throw new Error("Please select at least one goal");
  }
  if (
    !data.weeklyWorkoutTarget ||
    data.weeklyWorkoutTarget < 1 ||
    data.weeklyWorkoutTarget > 7
  ) {
    throw new Error("Please set a weekly workout target");
  }

  // ── Persist ─────────────────────────────────────────────────────────────
  await prisma.userProfile.upsert({
    where: { userId: user.id },
    create: {
      userId: user.id,
      displayName: data.displayName,
      age: data.age,
      weightKg: data.weightKg,
      goals: data.goals,
      weeklyWorkoutTarget: data.weeklyWorkoutTarget,
      unitSystem: data.unitSystem,
      onboardingComplete: true,
    },
    update: {
      displayName: data.displayName,
      age: data.age,
      weightKg: data.weightKg,
      goals: data.goals,
      weeklyWorkoutTarget: data.weeklyWorkoutTarget,
      unitSystem: data.unitSystem,
      onboardingComplete: true,
    },
  });

  // ── Set cookie for middleware ────────────────────────────────────────────
  // Middleware runs on the edge and can't hit the DB, so we signal
  // completion via a cookie. It's not a secret — the DB is the source of truth.
  const cookieStore = await cookies();
  cookieStore.set("mm_onboarding_complete", "1", {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    // 1 year — this cookie effectively never needs to expire
    maxAge: 60 * 60 * 24 * 365,
  });

  redirect("/dashboard");
}
