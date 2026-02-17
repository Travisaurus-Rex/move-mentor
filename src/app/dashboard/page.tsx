import {
  getTotalCardioMinutes,
  getTotalVolume,
  getWorkoutsPerWeek,
  getStrengthExercisesCount,
  getCardioExercisesCount,
} from "@/lib/queries/workouts";
import { DashboardStats } from "./components/DashboardStats";

export default async function DashboardPage() {
  const [volume, cardioMinutes, chartData, strengthCount, cardioCount] =
    await Promise.all([
      getTotalVolume("1W"),
      getTotalCardioMinutes("1W"),
      getWorkoutsPerWeek("1W"),
      getStrengthExercisesCount(),
      getCardioExercisesCount(),
    ]);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <DashboardStats
        initialVolume={volume}
        initialCardioMinutes={cardioMinutes}
        initialChartData={chartData}
        strengthCount={strengthCount}
        cardioCount={cardioCount}
      />
    </div>
  );
}
