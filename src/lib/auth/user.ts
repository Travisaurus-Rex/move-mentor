import { getServerSession } from "next-auth"
import { prisma } from "../prisma"
import { User } from "@/generated/prisma/client"
import { authOptions } from "@/app/api/auth/authOptions";

export async function getUser(): Promise<User> {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
        throw new Error('Not authenticated');
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    if (!user) {
        throw new Error('User not found');
    }

    return user;
}