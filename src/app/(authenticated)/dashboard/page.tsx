import {
  getTotalCardioMinutes,
  getTotalVolume,
  getWorkoutsPerWeek,
  getStrengthExercisesCount,
  getCardioExercisesCount,
  getUserWorkoutsCount,
} from "@/lib/queries/workouts";
import { DashboardStats } from "./components/DashboardStats";
import { getUserWithProfile } from "@/lib/queries/user-profile";

export default async function DashboardPage() {
  const { id: userId, profile } = await getUserWithProfile();
  const [
    volume,
    cardioMinutes,
    chartData,
    strengthCount,
    cardioCount,
    totalUserWorkouts,
  ] = await Promise.all([
    getTotalVolume("1W", userId, profile.unitSystem),
    getTotalCardioMinutes("1W", userId),
    getWorkoutsPerWeek("1W", userId),
    getStrengthExercisesCount(userId),
    getCardioExercisesCount(userId),
    getUserWorkoutsCount(userId),
  ]);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <DashboardStats
        unitSystem={profile.unitSystem}
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
