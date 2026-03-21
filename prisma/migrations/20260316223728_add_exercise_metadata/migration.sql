-- CreateEnum
CREATE TYPE "MovementPattern" AS ENUM ('HORIZONTAL_PUSH', 'VERTICAL_PUSH', 'HORIZONTAL_PULL', 'VERTICAL_PULL', 'QUAD_DOMINANT', 'HIP_DOMINANT', 'ISOLATION', 'CORE', 'CARDIO');

-- CreateEnum
CREATE TYPE "MuscleGroup" AS ENUM ('CHEST', 'BACK', 'SHOULDERS', 'BICEPS', 'TRICEPS', 'FOREARMS', 'QUADS', 'HAMSTRINGS', 'GLUTES', 'CALVES', 'CORE');

-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "isCompound" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "movementPattern" "MovementPattern",
ADD COLUMN     "muscleGroups" "MuscleGroup"[];
