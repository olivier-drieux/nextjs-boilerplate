import { connection } from "@/lib/redis";
import { Queue } from "bullmq";
import type { CreateUserJobData } from "./create-user-job";

export const createUserQueue = new Queue<CreateUserJobData>("create-user", {
	connection,
	defaultJobOptions: { attempts: 0 },
});
