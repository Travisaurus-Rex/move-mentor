import { UnitSystem } from "@prisma/client";

export type Goal =
  | "LOSE_WEIGHT"
  | "BUILD_MUSCLE"
  | "IMPROVE_ENDURANCE"
  | "INCREASE_STRENGTH";

export interface OnboardingData {
  displayName: string;
  age: number;
  unitSystem: UnitSystem;
  weightKg: number;
  goals: Goal[];
  weeklyWorkoutTarget: number;
}

export const GOAL_LABELS: Record<Goal, string> = {
  LOSE_WEIGHT: "Lose weight",
  BUILD_MUSCLE: "Build muscle",
  IMPROVE_ENDURANCE: "Improve endurance",
  INCREASE_STRENGTH: "Increase strength",
};

export const GOAL_DESCRIPTIONS: Record<Goal, string> = {
  LOSE_WEIGHT: "Burn fat and reach a healthier body composition",
  BUILD_MUSCLE: "Add size and mass through progressive overload",
  IMPROVE_ENDURANCE: "Push further, longer, with less effort",
  INCREASE_STRENGTH: "Move heavier weight, get demonstrably stronger",
};
