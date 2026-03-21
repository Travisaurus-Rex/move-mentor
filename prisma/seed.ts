import {
  PrismaClient,
  ExerciseCategory,
  MuscleGroup,
  MovementPattern,
} from "@prisma/client";

const prisma = new PrismaClient();

const exercises = [
  // --- Compound Strength ---
  {
    name: "Bench Press",
    category: ExerciseCategory.STRENGTH,
    muscleGroups: [
      MuscleGroup.CHEST,
      MuscleGroup.TRICEPS,
      MuscleGroup.SHOULDERS,
    ],
    movementPattern: MovementPattern.HORIZONTAL_PUSH,
    isCompound: true,
  },
  {
    name: "Incline Bench Press",
    category: ExerciseCategory.STRENGTH,
    muscleGroups: [
      MuscleGroup.CHEST,
      MuscleGroup.TRICEPS,
      MuscleGroup.SHOULDERS,
    ],
    movementPattern: MovementPattern.HORIZONTAL_PUSH,
    isCompound: true,
  },
  {
    name: "Overhead Press",
    category: ExerciseCategory.STRENGTH,
    muscleGroups: [MuscleGroup.SHOULDERS, MuscleGroup.TRICEPS],
    movementPattern: MovementPattern.VERTICAL_PUSH,
    isCompound: true,
  },
  {
    name: "Squat",
    category: ExerciseCategory.STRENGTH,
    muscleGroups: [
      MuscleGroup.QUADS,
      MuscleGroup.GLUTES,
      MuscleGroup.HAMSTRINGS,
    ],
    movementPattern: MovementPattern.QUAD_DOMINANT,
    isCompound: true,
  },
  {
    name: "Front Squat",
    category: ExerciseCategory.STRENGTH,
    muscleGroups: [MuscleGroup.QUADS, MuscleGroup.GLUTES, MuscleGroup.CORE],
    movementPattern: MovementPattern.QUAD_DOMINANT,
    isCompound: true,
  },
  {
    name: "Deadlift",
    category: ExerciseCategory.STRENGTH,
    muscleGroups: [
      MuscleGroup.HAMSTRINGS,
      MuscleGroup.GLUTES,
      MuscleGroup.BACK,
    ],
    movementPattern: MovementPattern.HIP_DOMINANT,
    isCompound: true,
  },
  {
    name: "Romanian Deadlift",
    category: ExerciseCategory.STRENGTH,
    muscleGroups: [MuscleGroup.HAMSTRINGS, MuscleGroup.GLUTES],
    movementPattern: MovementPattern.HIP_DOMINANT,
    isCompound: true,
  },
  {
    name: "Barbell Row",
    category: ExerciseCategory.STRENGTH,
    muscleGroups: [MuscleGroup.BACK, MuscleGroup.BICEPS],
    movementPattern: MovementPattern.HORIZONTAL_PULL,
    isCompound: true,
  },

  // --- Strength Accessories ---
  {
    name: "Dumbbell Chest Press",
    category: ExerciseCategory.STRENGTH,
    muscleGroups: [MuscleGroup.CHEST, MuscleGroup.TRICEPS],
    movementPattern: MovementPattern.HORIZONTAL_PUSH,
    isCompound: false,
  },
  {
    name: "Dumbbell Shoulder Press",
    category: ExerciseCategory.STRENGTH,
    muscleGroups: [MuscleGroup.SHOULDERS, MuscleGroup.TRICEPS],
    movementPattern: MovementPattern.VERTICAL_PUSH,
    isCompound: false,
  },
  {
    name: "Lateral Raise",
    category: ExerciseCategory.STRENGTH,
    muscleGroups: [MuscleGroup.SHOULDERS],
    movementPattern: MovementPattern.ISOLATION,
    isCompound: false,
  },
  {
    name: "Bicep Curl",
    category: ExerciseCategory.STRENGTH,
    muscleGroups: [MuscleGroup.BICEPS],
    movementPattern: MovementPattern.ISOLATION,
    isCompound: false,
  },
  {
    name: "Tricep Extension",
    category: ExerciseCategory.STRENGTH,
    muscleGroups: [MuscleGroup.TRICEPS],
    movementPattern: MovementPattern.ISOLATION,
    isCompound: false,
  },
  {
    name: "Leg Press",
    category: ExerciseCategory.STRENGTH,
    muscleGroups: [MuscleGroup.QUADS, MuscleGroup.GLUTES],
    movementPattern: MovementPattern.QUAD_DOMINANT,
    isCompound: false,
  },
  {
    name: "Leg Curl",
    category: ExerciseCategory.STRENGTH,
    muscleGroups: [MuscleGroup.HAMSTRINGS],
    movementPattern: MovementPattern.ISOLATION,
    isCompound: false,
  },
  {
    name: "Leg Extension",
    category: ExerciseCategory.STRENGTH,
    muscleGroups: [MuscleGroup.QUADS],
    movementPattern: MovementPattern.ISOLATION,
    isCompound: false,
  },
  {
    name: "Calf Raise",
    category: ExerciseCategory.STRENGTH,
    muscleGroups: [MuscleGroup.CALVES],
    movementPattern: MovementPattern.ISOLATION,
    isCompound: false,
  },
  {
    name: "Cable Row",
    category: ExerciseCategory.STRENGTH,
    muscleGroups: [MuscleGroup.BACK, MuscleGroup.BICEPS],
    movementPattern: MovementPattern.HORIZONTAL_PULL,
    isCompound: false,
  },
  {
    name: "Lat Pulldown",
    category: ExerciseCategory.STRENGTH,
    muscleGroups: [MuscleGroup.BACK, MuscleGroup.BICEPS],
    movementPattern: MovementPattern.VERTICAL_PULL,
    isCompound: false,
  },
  {
    name: "Face Pull",
    category: ExerciseCategory.STRENGTH,
    muscleGroups: [MuscleGroup.SHOULDERS, MuscleGroup.BACK],
    movementPattern: MovementPattern.HORIZONTAL_PULL,
    isCompound: false,
  },
  {
    name: "Chest Fly",
    category: ExerciseCategory.STRENGTH,
    muscleGroups: [MuscleGroup.CHEST],
    movementPattern: MovementPattern.ISOLATION,
    isCompound: false,
  },
  {
    name: "Shrug",
    category: ExerciseCategory.STRENGTH,
    muscleGroups: [MuscleGroup.BACK, MuscleGroup.FOREARMS],
    movementPattern: MovementPattern.ISOLATION,
    isCompound: false,
  },

  // --- Bodyweight ---
  {
    name: "Pull-Up",
    category: ExerciseCategory.BODYWEIGHT,
    muscleGroups: [MuscleGroup.BACK, MuscleGroup.BICEPS],
    movementPattern: MovementPattern.VERTICAL_PULL,
    isCompound: true,
  },
  {
    name: "Chin-Up",
    category: ExerciseCategory.BODYWEIGHT,
    muscleGroups: [MuscleGroup.BACK, MuscleGroup.BICEPS],
    movementPattern: MovementPattern.VERTICAL_PULL,
    isCompound: true,
  },
  {
    name: "Push-Up",
    category: ExerciseCategory.BODYWEIGHT,
    muscleGroups: [
      MuscleGroup.CHEST,
      MuscleGroup.TRICEPS,
      MuscleGroup.SHOULDERS,
    ],
    movementPattern: MovementPattern.HORIZONTAL_PUSH,
    isCompound: true,
  },
  {
    name: "Dip",
    category: ExerciseCategory.BODYWEIGHT,
    muscleGroups: [MuscleGroup.CHEST, MuscleGroup.TRICEPS],
    movementPattern: MovementPattern.VERTICAL_PUSH,
    isCompound: true,
  },
  {
    name: "Plank",
    category: ExerciseCategory.BODYWEIGHT,
    muscleGroups: [MuscleGroup.CORE],
    movementPattern: MovementPattern.CORE,
    isCompound: false,
  },
  {
    name: "Hanging Leg Raise",
    category: ExerciseCategory.BODYWEIGHT,
    muscleGroups: [MuscleGroup.CORE],
    movementPattern: MovementPattern.CORE,
    isCompound: false,
  },

  // --- Cardio ---
  {
    name: "Running",
    category: ExerciseCategory.CARDIO,
    muscleGroups: [
      MuscleGroup.QUADS,
      MuscleGroup.HAMSTRINGS,
      MuscleGroup.CALVES,
    ],
    movementPattern: MovementPattern.CARDIO,
    isCompound: false,
  },
  {
    name: "Cycling",
    category: ExerciseCategory.CARDIO,
    muscleGroups: [MuscleGroup.QUADS, MuscleGroup.HAMSTRINGS],
    movementPattern: MovementPattern.CARDIO,
    isCompound: false,
  },
  {
    name: "Rowing",
    category: ExerciseCategory.CARDIO,
    muscleGroups: [MuscleGroup.BACK, MuscleGroup.SHOULDERS, MuscleGroup.CORE],
    movementPattern: MovementPattern.CARDIO,
    isCompound: false,
  },
  {
    name: "Swimming",
    category: ExerciseCategory.CARDIO,
    muscleGroups: [MuscleGroup.SHOULDERS, MuscleGroup.BACK, MuscleGroup.CORE],
    movementPattern: MovementPattern.CARDIO,
    isCompound: false,
  },
  {
    name: "Walking",
    category: ExerciseCategory.CARDIO,
    muscleGroups: [
      MuscleGroup.QUADS,
      MuscleGroup.HAMSTRINGS,
      MuscleGroup.CALVES,
    ],
    movementPattern: MovementPattern.CARDIO,
    isCompound: false,
  },
  {
    name: "Elliptical",
    category: ExerciseCategory.CARDIO,
    muscleGroups: [MuscleGroup.QUADS, MuscleGroup.HAMSTRINGS],
    movementPattern: MovementPattern.CARDIO,
    isCompound: false,
  },
  {
    name: "Stair Climber",
    category: ExerciseCategory.CARDIO,
    muscleGroups: [MuscleGroup.QUADS, MuscleGroup.GLUTES, MuscleGroup.CALVES],
    movementPattern: MovementPattern.CARDIO,
    isCompound: false,
  },
  {
    name: "Jump Rope",
    category: ExerciseCategory.CARDIO,
    muscleGroups: [MuscleGroup.CALVES, MuscleGroup.CORE],
    movementPattern: MovementPattern.CARDIO,
    isCompound: false,
  },
];

async function main() {
  console.log("Seeding exercises...");

  for (const exercise of exercises) {
    await prisma.exercise.upsert({
      where: { name: exercise.name },
      update: {
        muscleGroups: exercise.muscleGroups,
        movementPattern: exercise.movementPattern,
        isCompound: exercise.isCompound,
      },
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
