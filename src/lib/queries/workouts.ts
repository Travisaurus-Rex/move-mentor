import { prisma } from '@/lib/prisma';
import { getUser } from '../auth/auth';
import { Workout } from '@/generated/prisma/client';

export async function getWorkoutById(id: string): Promise<Workout> {
    const workout = await prisma.workout.findFirst({
        where: {
            id
        }
    });

    if (!workout) {
        throw new Error('Workout not found');
    }

    return workout;
}

export async function getUserWorkouts(): Promise<Workout[]> {
  const user = await getUser();

  return prisma.workout.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      date: 'desc',
    },
  })
}

export async function getUserWorkoutsCount(): Promise<number> {
  const user = await getUser();

  return await prisma.workout.count({
    where: {
      userId: user.id
    }
  });
}
