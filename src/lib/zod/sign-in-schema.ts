import { z } from "zod";

export const signInSchema = z.object({
	identifier: z.string().min(1, "User is required."),
	password: z.string().min(2, "Password is required."),
});

export type SignInSchema = z.infer<typeof signInSchema>;
