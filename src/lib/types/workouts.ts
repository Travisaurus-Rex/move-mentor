import { Prisma } from "@prisma/client/client";

export type WorkoutWithExercisesAndSets = Prisma.WorkoutGetPayload<{
  include: {
    exercises: {
      include: {
        exercise: true;
        sets: true;
      };
    };
  };
}>;

export type WorkoutExerciseWithRelations = Prisma.WorkoutExerciseGetPayload<{
  include: {
    exercise: true;
    sets: true;
  };
}>;
