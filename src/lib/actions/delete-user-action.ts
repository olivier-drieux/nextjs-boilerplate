"use server";

import { db } from "@/lib/drizzle/drizzle";
import { userSchema } from "@/lib/drizzle/schema/user-schema";
import { eq } from "drizzle-orm";
import { createSafeActionClient } from "next-safe-action";
import { revalidatePath } from "next/cache";
import { deleteUserSchema } from "../zod/delete-user-schema";

export const deleteUserAction = createSafeActionClient()
	.schema(deleteUserSchema)
	.action(async ({ parsedInput }) => {
		await db.delete(userSchema).where(eq(userSchema.id, parsedInput.id));
		revalidatePath("/users/infinite-scroll");
	});
