import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'

export async function getUserWorkouts() {
  const session = await getServerSession()

  if (!session?.user?.email) {
    throw new Error('Not authenticated')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user) {
    throw new Error('User not found')
  }

  return prisma.workout.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      date: 'desc',
    },
  })
}
