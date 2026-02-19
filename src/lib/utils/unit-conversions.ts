import { UnitSystem } from "@prisma/client";

// weight: kg <-> lbs
export const toKg = (weight: number, system: UnitSystem) =>
  system === UnitSystem.IMPERIAL ? weight / 2.205 : weight;

export const fromKg = (weight: number, system: UnitSystem) =>
  system === UnitSystem.IMPERIAL ? weight * 2.205 : weight;

// distance: km <-> miles
export const toKm = (distance: number, system: UnitSystem) =>
  system === UnitSystem.IMPERIAL ? distance * 1.60934 : distance;

export const fromKm = (distance: number, system: UnitSystem) =>
  system === UnitSystem.IMPERIAL ? distance / 1.60934 : distance;
