import { prisma } from "../prisma";

export async function findAllPost() {
    const results = await prisma.post.findMany({
        include: {
            user: true
        },
        orderBy: {
            created_at: 'desc'
        },
    });
    return results;
}

export async function findOnePost(id: string) {
    const results = await prisma.post.findFirst({
        where: {
            id
        },
        include: {
            user: true
        },
    });
    return results;
}