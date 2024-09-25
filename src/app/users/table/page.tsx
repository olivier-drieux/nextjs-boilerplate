import { getQueryClient } from "@/lib/query-client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getPaginatedUsers } from "../get-users-query";
import { UsersDataTable } from "./users-data-table";
import { db } from "@/lib/drizzle/drizzle";
import { count } from "drizzle-orm";
import { userSchema } from "@/lib/drizzle/schema/user-schema";

const initialPagination = { pageIndex: 1, pageSize: 10 };

export default async function Users() {
	const queryClient = getQueryClient();

	queryClient.prefetchQuery({
		queryKey: ["users", initialPagination],
		queryFn: () => getPaginatedUsers(initialPagination),
	});

    const [{ countRows }] = await db.select({ countRows: count() }).from(userSchema);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<UsersDataTable countRows={countRows} />
		</HydrationBoundary>
	);
}
