import { ExerciseCategory } from "@prisma/client";
import { prisma } from "../src/lib/prisma";

async function main() {
  const exercises = [
    { name: "Bench Press", category: ExerciseCategory.STRENGTH },
    { name: "Squat", category: ExerciseCategory.STRENGTH },
    { name: "Deadlift", category: ExerciseCategory.STRENGTH },
    { name: "Overhead Press", category: ExerciseCategory.STRENGTH },
    { name: "Pull-Up", category: ExerciseCategory.BODYWEIGHT },
    { name: "Running", category: ExerciseCategory.CARDIO },
  ];

  for (const exercise of exercises) {
    await prisma.exercise.upsert({
      where: { name: exercise.name },
      update: {},
      create: exercise,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
