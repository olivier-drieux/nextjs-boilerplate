"use client";

import { getQueryClient } from "@/lib/query-client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { cx } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { CreateUserButton } from "../create-user-button";
import { getPaginatedUsers } from "../get-users-query";
import UserCard from "./user-card";

export default function UsersList() {
	const { data, fetchNextPage, isFetching, hasNextPage } =
		useSuspenseInfiniteQuery({
			queryKey: ["users"],
			queryFn: ({ pageParam }) =>
				getPaginatedUsers({
					pageIndex: pageParam,
					pageSize: 20,
				}),
			initialPageParam: 1,
			getNextPageParam(lastPage, _, lastPageParam) {
				return 0 === lastPage.length ? undefined : lastPageParam + 1;
			},
		});

	const { ref } = useInView({
		skip: !hasNextPage,
		onChange: (inView) => inView && fetchNextPage(),
	});

	return (
		<div>
			<div className="flex gap-8 mb-8">
				<h1 className="text-3xl font-bold">Infinite scroll</h1>
				<CreateUserButton
					onSuccess={() =>
						getQueryClient().invalidateQueries({ queryKey: ["users"] })
					}
				/>
			</div>
			<div className="flex flex-wrap justify-center gap-8">
				{data.pages.flat().map((user) => (
					<UserCard key={user.id} user={user} />
				))}
			</div>
			<div className="flex justify-center mt-4" ref={ref}>
				<Loader2
					className={cx("h-10 w-10 animate-spinz", {
						hidden: !isFetching,
					})}
				/>
			</div>
		</div>
	);
}
