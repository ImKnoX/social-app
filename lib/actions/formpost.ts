'use server';

import { z } from 'zod';
import { prisma } from '../prisma';
import { authOptions } from '../auth';
import { getServerSession } from 'next-auth';

const PostFormSchema = z.object({
    title: z.string()
    .min(2, { message: 'Title must have atleast 2 characters' })
    .max(255, {
        message: 'Title maximum length is 255 words'
    }),
    content: z.string().nullable(),
}); 

type State = {
    message?: string | null;
    errors?: {};
};

export async function createPost(
    formData: FormData
) {
    const session = await getServerSession(authOptions);

    if(!session) return null;

    //Validate input
    const validateFields = PostFormSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content'),
    });
    // Handle Validation Errors
    if (!validateFields.success) {
        const state: State = {
            errors: validateFields.error.flatten().fieldErrors,
            message: 'Oops, I think there\'s a mistake with your inputs.',
        }

        return state;
    }

    const userdata = await prisma.user.findUnique({
        where: {
            email: session.user?.email as string
        }
    });

    const newPost = await prisma.post.create({
        data: {
            userId: userdata?.id,
            title: validateFields.data.title as string,
            content: validateFields.data.content as string
        }
    })

    console.log(newPost);
    
    return newPost;
};