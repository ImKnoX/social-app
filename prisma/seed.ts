import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

type UserDataTypes = {
    username: string;
    email: string;
    password: string;
}

async function main() {
    const password = await bcrypt.hash('admin123', 12);
    const userData: UserDataTypes = {
        email: 'admin@admin.com',
        username: 'Admin',
        password: password
    }
  
    const user = await prisma.user.upsert({
        where: { email: userData.email },
        update: {},
        create: {
            username: userData.username,
            email: userData.email,
            password: userData.password
        },
    });
    console.log({ user });
}

main()
.then(() => prisma.$disconnect())
.catch(async(err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
});