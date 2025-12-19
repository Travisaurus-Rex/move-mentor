'use server'

import { getUser } from "@/lib/auth/auth";
import { prisma } from "@/lib/prisma";

export async function createWorkout(params: { date: string, notes: string}): Promise<void> {
    const user = await getUser();

    await prisma.workout.create({
        data: {
            date: new Date(params.date),
            notes: params.notes,
            userId: user.id
        }
    })
}