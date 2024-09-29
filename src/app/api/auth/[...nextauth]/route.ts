import { db } from "@/lib/drizzle/drizzle";
import { userSchema } from "@/lib/drizzle/schema/user-schema";
import { and, eq, or } from "drizzle-orm";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const handler = NextAuth({
	pages: {
		signIn: "/auth/sign-in",
		signOut: undefined,
	},
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				identifier: {
					label: "Username or email",
					type: "text",
					placeholder: "john_doe",
				},
				password: { label: "Password", type: "password" },
			},
			authorize: async (credentials) => {
				if (!credentials?.identifier || !credentials?.password) {
					return null;
				}

				const user = (
					await db
						.select()
						.from(userSchema)
						.where(
							and(
								or(
									eq(userSchema.email, credentials.identifier),
									eq(userSchema.username, credentials.identifier),
								),
								eq(userSchema.password, credentials.password),
							),
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
