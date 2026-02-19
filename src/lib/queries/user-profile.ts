import { UnitSystem, UserProfile } from "@prisma/client";
import { getSession } from "../auth/auth";
import { prisma } from "../prisma";

import { Prisma } from "@prisma/client";

export type UserWithProfile = Prisma.UserGetPayload<{
  include: { profile: true };
}> & { profile: UserProfile };

export async function getUserUnitSystem(userId: string): Promise<UnitSystem> {
  const profile = await prisma.userProfile.findUnique({
    where: { userId },
    select: { unitSystem: true },
  });

  return UnitSystem[profile?.unitSystem || UnitSystem.METRIC];
}

export async function getUserProfile(
  userId: string,
): Promise<UserProfile | null> {
  return prisma.userProfile.findUnique({
    where: { userId },
  });
}

export async function getUserWithProfile(): Promise<UserWithProfile> {
  const session = await getSession();
  if (!session?.user?.email) throw new Error("Not authenticated");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { profile: true },
  });

  if (!user) throw new Error("User not found");
  if (!user.profile) throw new Error("User profile doesn't exist");

  return user as UserWithProfile;
}
