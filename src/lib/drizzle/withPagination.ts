import type { SQL } from "drizzle-orm";
import type { MySqlColumn, MySqlSelect } from "drizzle-orm/mysql-core";

export function withPagination<T extends MySqlSelect>(
	qb: T,
	page = 0,
	pageSize = 10,
	orderByColumn?: MySqlColumn | SQL | SQL.Aliased,
) {
	const newQb = qb
		.limit(pageSize)
		.offset(0 === page ? pageSize : page * pageSize);

	if (orderByColumn) {
		return newQb.orderBy(orderByColumn);
	}

	return newQb;
}
