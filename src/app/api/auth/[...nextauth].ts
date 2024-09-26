import { db } from '@/lib/drizzle/drizzle';
import { userSchema } from '@/lib/drizzle/schema/user-schema';
import { and, eq } from 'drizzle-orm';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
    // pages: {
    //     signIn: '/sign-in',
    //     signOut: undefined,
    // },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {
                    label: 'Username',
                    type: 'text',
                    placeholder: 'john_doe',
                    value: 'john_doe',
                },
                password: { label: 'Password', type: 'password', value: 'password' },
            },
            authorize: async (credentials) => {
                if (!credentials?.username || !credentials?.password) {
                    return null;
                }

                const user = (
                    await db
                        .select()
                        .from(userSchema)
                        .where(
                            and(
                                eq(userSchema.username, credentials.username),
                                eq(userSchema.password, credentials.password)
                            )
                        )
                )[0];

                if (!user) {
                    return null;
                }

                return {
                    id: user.id.toString(),
                    name: user.username,
                    email: user.email,
                };
            },
        }),
    ],
});

export { handler as GET, handler as POST };
