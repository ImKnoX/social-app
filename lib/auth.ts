import type { NextAuthOptions } from "next-auth";
import { compare } from "bcrypt";
import CredentialsProvider  from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import crypto from 'node:crypto'

type UserTypes = {
    id?: string;
    name?: string;
    email?: string;
    randomKey?: string;
}

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
           name: 'Email and Password',
           credentials: {
            email: {
                label: "Email",
                type: "email",
                placeholder: "example@example.com",
            },
            password: { label: "Password", type: "password" },
           },
           async authorize(credentials) {
            if (!credentials?.email || !credentials.password) {
                return null;
            };

            const user = await prisma.user.findUnique({
                where: {
                  email: credentials.email,
                },
            });
      
            if (!user || !(await compare(credentials.password, user.password))) {
                return null;
            };

            const hash = crypto.createHmac('sha256', user.password)
            .update('I love cupcakes')
            .digest('hex');

      
            return {
                id: user.id,
                email: user.email,
                name: user.username,
                randomKey: hash
            };
           },
        }),
    ],
    callbacks: {
        session: ({ session, token }) => {
            console.log(`Session Callback`, { session, token });
            return {
                ...session,
                id: token.id,
                randomKey: token.randomKey
            };
        },
        jwt: ({ token, user }) => {
            console.log("JWT Callback", { token, user });
            if (user) {
              const u = user as unknown as UserTypes;
              return {
                ...token,
                id: u.id,
                randomKey: u.randomKey,
              };
            }
            return token;
        },
    },
};