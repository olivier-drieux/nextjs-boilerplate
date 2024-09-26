"use server";

import { db } from "@/lib/drizzle/drizzle";
import {
	getSelectableUserFields,
	userSchema,
} from "@/lib/drizzle/schema/user-schema";
import { withPagination } from "@/lib/drizzle/withPagination";
import { like, or } from "drizzle-orm";

export interface GetPaginatedUsersProps {
	pageIndex: number;
	pageSize: number;
	search?: string;
}

export async function getPaginatedUsers({
	pageIndex,
	pageSize,
	search,
}: GetPaginatedUsersProps) {
	return withPagination(
		db
			.select(getSelectableUserFields)
			.from(userSchema)
			.where(getSearchCondition(search))
			.$dynamic(),
		pageIndex,
		pageSize,
	);
}

function getSearchCondition(search: string | undefined) {
	return search
		? or(
				like(userSchema.email, `%${search}%`),
				like(userSchema.username, `%${search}%`),
			)
		: undefined;
}
