import { getQueryClient } from "@/lib/query-client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getPaginatedUsers } from "../get-users-query";
import UsersList from "./user-list";

export default async function InfiniteScroll() {
	const queryClient = getQueryClient();
	queryClient.prefetchInfiniteQuery({
		queryKey: ["users"],
		queryFn: () =>
			getPaginatedUsers({
				pageIndex: 1,
				pageSize: 20,
			}),
		initialPageParam: 1,
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<UsersList />
		</HydrationBoundary>
	);
}
