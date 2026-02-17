import {
  getTotalCardioMinutes,
  getTotalVolume,
  getWorkoutsPerWeek,
} from "@/lib/queries/workouts";
import { Period } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const period = (req.nextUrl.searchParams.get("period") ?? "1W") as Period;

  const [volume, cardioMinutes, chartData] = await Promise.all([
    getTotalVolume(period),
    getTotalCardioMinutes(period),
    getWorkoutsPerWeek(period),
  ]);

  return NextResponse.json({ volume, cardioMinutes, chartData });
}
