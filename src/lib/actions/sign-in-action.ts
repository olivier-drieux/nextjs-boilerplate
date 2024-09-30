"use server";

import { createSafeActionClient } from "next-safe-action";
import { signInSchema } from "../zod/sign-in-schema";
import { redirect } from "next/navigation";

export const signInAction = createSafeActionClient()
	.schema(signInSchema)
	.action(async ({ parsedInput }) => {
		console.log(parsedInput);
		const formData = new FormData();
		formData.append("identifier", parsedInput.identifier);
		formData.append("password", parsedInput.password);
	});
