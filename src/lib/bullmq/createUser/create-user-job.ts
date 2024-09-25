import type { Database } from "@/lib/drizzle/drizzle";
import { userSchema } from "@/lib/drizzle/schema/user-schema";
import type { Job } from "bullmq";

export type CreateUserJobData = {
	username: string;
	email: string;
	password: string;
};

export const createUserJob = async (
	job: Job<CreateUserJobData>,
	db: Database,
) => {
	job.log("Start processing job to create user");
	await new Promise((resolve) => setTimeout(resolve, 5000));
	await db.insert(userSchema).values(job.data).execute();
	job.log("User created successfully");
};
