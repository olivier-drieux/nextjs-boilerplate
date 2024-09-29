import { db } from "@/lib/drizzle/drizzle";
import { userSchema } from "@/lib/drizzle/schema/user-schema";
import { and, eq, or } from "drizzle-orm";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig = {
	pages: {
		signIn: "/auth/sign-in",
		signOut: undefined,
	},
	callbacks: {
		authorized: async ({ auth, request: { nextUrl } }) => {
			const isLoggedIn = !!auth?.user;
			const isOnAuth = nextUrl.pathname.match(/\/auth\/*/);
			if (isOnAuth) {
				if (isLoggedIn) {
					return Response.redirect(new URL("/", nextUrl));
				}

				return false;
			}
			return true;
		},
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

				console.log(credentials);
				return null;

				// const user = (
				// 	await db
				// 		.select()
				// 		.from(userSchema)
				// 		.where(
				// 			and(
				// 				or(
				// 					eq(userSchema.email, credentials.identifier),
				// 					eq(userSchema.username, credentials.identifier),
				// 				),
				// 				eq(userSchema.password, credentials.password),
				// 			),
				// 		)
				// )[0];

				// if (!user) {
				// 	return null;
				// }

				// return {
				// 	id: user.id.toString(),
				// 	name: user.username,
				// 	email: user.email,
				// };
			},
		}),
	],
} satisfies NextAuthConfig;
