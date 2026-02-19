import {
  getTotalCardioMinutes,
  getTotalVolume,
  getWorkoutsPerWeek,
  getStrengthExercisesCount,
  getCardioExercisesCount,
  getUserWorkoutsCount,
} from "@/lib/queries/workouts";
import { DashboardStats } from "./components/DashboardStats";

export default async function DashboardPage() {
  const [
    volume,
    cardioMinutes,
    chartData,
    strengthCount,
    cardioCount,
    totalUserWorkouts,
  ] = await Promise.all([
    getTotalVolume("1W"),
    getTotalCardioMinutes("1W"),
    getWorkoutsPerWeek("1W"),
    getStrengthExercisesCount(),
    getCardioExercisesCount(),
    getUserWorkoutsCount(),
  ]);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <DashboardStats
        initialVolume={volume}
        initialCardioMinutes={cardioMinutes}
        initialChartData={chartData}
        strengthCount={strengthCount}
        cardioCount={cardioCount}
        totalUserWorkouts={totalUserWorkouts}
      />
    </div>
  );
}
