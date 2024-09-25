import type { CreateUserJobData } from "./lib/bullmq/createUser/create-user-job";

/**
 * Activate instrumentation for BullMQ in next.config.mjs `experimental.instrumentationHook: true`
 */
export const register = async () => {
	if (process.env.NEXT_RUNTIME === "nodejs") {
		const { Worker } = await import("bullmq");
		const { connection } = await import("./lib/redis");
		const { db } = await import("./lib/drizzle/drizzle");
		const { createUserJob } = await import(
			"./lib/bullmq/createUser/create-user-job"
		);

		new Worker<CreateUserJobData>(
			"create-user",
			async (job) => createUserJob(job, db),
			{
				connection,
				concurrency: 10,
				removeOnComplete: { count: 1000 },
				removeOnFail: { count: 5000 },
			},
		);
	}
};
