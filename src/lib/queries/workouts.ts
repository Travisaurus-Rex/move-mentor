import { prisma } from '@/lib/prisma';
import { getUser } from '../auth/auth';
import { Workout } from '@/generated/prisma/client';
import { notFound } from 'next/navigation';

export async function getWorkoutById(id: string): Promise<Workout> {
    const workout = await prisma.workout.findFirst({
        where: {
            id
        }
    });

    if (!workout) {
      notFound();
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
