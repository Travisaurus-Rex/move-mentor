import { getServerSession } from "next-auth"
import { prisma } from "../prisma"
import { User } from "@/generated/prisma/client"

export async function getUser(): Promise<User> {
    const session = await getServerSession();
    
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