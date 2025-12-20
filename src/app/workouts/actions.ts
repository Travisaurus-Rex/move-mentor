'use server'

import { Workout } from "@/generated/prisma/client";
import { getUser } from "@/lib/auth/auth";
import { prisma } from "@/lib/prisma";

export async function createWorkout(params: { date: string, notes: string}): Promise<string> {
    const user = await getUser();

    let createdUser = await prisma.workout.create({
        data: {
            date: new Date(params.date),
            notes: params.notes,
            userId: user.id
        }
    })

    return createdUser.id;
}