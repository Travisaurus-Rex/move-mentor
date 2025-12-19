'use server'

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"

export async function createWorkout(params: { date: string, notes: string}): Promise<void> {
    const session = await getServerSession();

    if (!session?.user?.email) throw new Error('Not authenticated');

    const user = await prisma.user.findUnique({
        where: { email: session.user.email }
    });

    if (!user) {
        throw new Error('User not found')
    }

    await prisma.workout.create({
        data: {
            date: params.date,
            notes: params.notes,
            userId: user.id
        }
    })
}