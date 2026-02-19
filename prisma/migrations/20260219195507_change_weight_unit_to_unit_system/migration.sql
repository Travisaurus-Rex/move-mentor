/*
  Warnings:

  - You are about to drop the column `weightUnit` on the `UserProfile` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "UnitSystem" AS ENUM ('METRIC', 'IMPERIAL');

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "weightUnit",
ADD COLUMN     "unitSystem" "UnitSystem" NOT NULL DEFAULT 'METRIC';

-- DropEnum
DROP TYPE "public"."WeightUnit";
