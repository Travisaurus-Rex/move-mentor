import { getServerSession } from "next-auth";
import { prisma } from "../prisma";
import { User } from "@prisma/client/client";
import { authOptions } from "@/app/api/auth/authOptions";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return !!session;
}

export async function getUser(): Promise<User> {
  const session = await getSession();

  if (!session?.user?.email) {
    throw new Error("Not authenticated");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}
