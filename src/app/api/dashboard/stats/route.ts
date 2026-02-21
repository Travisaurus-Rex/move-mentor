import { getUserWithProfile } from "@/lib/queries/user-profile";
import {
  getTotalCardioMinutes,
  getTotalVolume,
  getExercisesPerPeriod,
} from "@/lib/queries/workouts";
import { Period } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const period = (req.nextUrl.searchParams.get("period") ?? "1W") as Period;
  const { id: userId, profile } = await getUserWithProfile();

  const [volume, cardioMinutes, chartData] = await Promise.all([
    getTotalVolume(period, userId, profile.unitSystem),
    getTotalCardioMinutes(period, userId),
    getExercisesPerPeriod(period, userId),
  ]);

  return NextResponse.json({ volume, cardioMinutes, chartData });
}
