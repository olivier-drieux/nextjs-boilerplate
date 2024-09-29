"use server";

import { db } from "@/lib/drizzle/drizzle";
import { userSchema } from "@/lib/drizzle/schema/user-schema";
import { createUserSchema } from "@/lib/zod/create-user-schema";
import { eq } from "drizzle-orm";
import { createSafeActionClient } from "next-safe-action";
import { revalidatePath } from "next/cache";

const serverSchema = createUserSchema
	.refine(
		async (data) => {
			const existingUsername = await db
				.select()
				.from(userSchema)
				.where(eq(userSchema.username, data.username));
			return 0 === existingUsername.length;
		},
		{
			message: "Username already exists",
			path: ["username"],
		},
	)
	.refine(
		async (data) => {
			const existingEmail = await db
				.select()
				.from(userSchema)
				.where(eq(userSchema.email, data.email));
			return 0 === existingEmail.length;
		},
		{
			message: "Email already exists",
			path: ["email"],
		},
	);

export const createUserAction = createSafeActionClient()
	.schema(serverSchema)
	.action(async ({ parsedInput }) => {
		await db.insert(userSchema).values(parsedInput).execute();
		revalidatePath("/users/infinite-scroll");
	});
