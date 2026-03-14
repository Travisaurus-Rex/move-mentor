-- CreateEnum
CREATE TYPE "Goal" AS ENUM ('LOSE_WEIGHT', 'BUILD_MUSCLE', 'IMPROVE_ENDURANCE', 'INCREASE_STRENGTH');

-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "age" INTEGER,
ADD COLUMN     "goals" "Goal"[],
ADD COLUMN     "onboardingComplete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "weeklyWorkoutTarget" INTEGER,
ADD COLUMN     "weightKg" DOUBLE PRECISION;
