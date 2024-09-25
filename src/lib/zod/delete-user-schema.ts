import { z } from "zod";

export const deleteUserSchema = z.object({
	id: z.number(),
});

export type DeleteUserSchema = z.infer<typeof deleteUserSchema>;
