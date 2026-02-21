import { ExerciseCategory } from "@prisma/client";
import { prisma } from "../src/lib/prisma";

async function main() {
  const exercises = [
    // Strength - Compound Lifts
    { name: "Bench Press", category: ExerciseCategory.STRENGTH },
    { name: "Squat", category: ExerciseCategory.STRENGTH },
    { name: "Deadlift", category: ExerciseCategory.STRENGTH },
    { name: "Overhead Press", category: ExerciseCategory.STRENGTH },
    { name: "Barbell Row", category: ExerciseCategory.STRENGTH },
    { name: "Romanian Deadlift", category: ExerciseCategory.STRENGTH },
    { name: "Front Squat", category: ExerciseCategory.STRENGTH },
    { name: "Incline Bench Press", category: ExerciseCategory.STRENGTH },

    // Strength - Accessories
    { name: "Dumbbell Chest Press", category: ExerciseCategory.STRENGTH },
    { name: "Dumbbell Shoulder Press", category: ExerciseCategory.STRENGTH },
    { name: "Lateral Raise", category: ExerciseCategory.STRENGTH },
    { name: "Bicep Curl", category: ExerciseCategory.STRENGTH },
    { name: "Tricep Extension", category: ExerciseCategory.STRENGTH },
    { name: "Leg Press", category: ExerciseCategory.STRENGTH },
    { name: "Leg Curl", category: ExerciseCategory.STRENGTH },
    { name: "Leg Extension", category: ExerciseCategory.STRENGTH },
    { name: "Calf Raise", category: ExerciseCategory.STRENGTH },
    { name: "Cable Row", category: ExerciseCategory.STRENGTH },
    { name: "Lat Pulldown", category: ExerciseCategory.STRENGTH },
    { name: "Face Pull", category: ExerciseCategory.STRENGTH },
    { name: "Chest Fly", category: ExerciseCategory.STRENGTH },
    { name: "Shrug", category: ExerciseCategory.STRENGTH },

    // Bodyweight
    { name: "Pull-Up", category: ExerciseCategory.BODYWEIGHT },
    { name: "Chin-Up", category: ExerciseCategory.BODYWEIGHT },
    { name: "Push-Up", category: ExerciseCategory.BODYWEIGHT },
    { name: "Dip", category: ExerciseCategory.BODYWEIGHT },
    { name: "Plank", category: ExerciseCategory.BODYWEIGHT },
    { name: "Hanging Leg Raise", category: ExerciseCategory.BODYWEIGHT },

    // Cardio
    { name: "Running", category: ExerciseCategory.CARDIO },
    { name: "Cycling", category: ExerciseCategory.CARDIO },
    { name: "Rowing", category: ExerciseCategory.CARDIO },
    { name: "Swimming", category: ExerciseCategory.CARDIO },
    { name: "Walking", category: ExerciseCategory.CARDIO },
    { name: "Elliptical", category: ExerciseCategory.CARDIO },
    { name: "Stair Climber", category: ExerciseCategory.CARDIO },
    { name: "Jump Rope", category: ExerciseCategory.CARDIO },
  ];

  for (const exercise of exercises) {
    await prisma.exercise.upsert({
      where: { name: exercise.name },
      update: {},
      create: exercise,
    });
  }

  console.log(`Seeded ${exercises.length} exercises`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
