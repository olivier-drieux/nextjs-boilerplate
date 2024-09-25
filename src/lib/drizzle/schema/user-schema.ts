import { type InferSelectModel, getTableColumns } from "drizzle-orm";
import {
	index,
	int,
	mysqlTable,
	timestamp,
	varchar,
} from "drizzle-orm/mysql-core";

export const userSchema = mysqlTable(
	"users",
	{
		id: int("id").primaryKey().autoincrement(),
		username: varchar("username", { length: 255 }).notNull().unique(),
		email: varchar("email", { length: 255 }).notNull().unique(),
		password: varchar("password", { length: 255 }).notNull(),
		createdAt: timestamp("created_at").defaultNow(),
		updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
	},
	(user) => {
		return { idIdx: index("id_idx").on(user.id) };
	},
);

const { password, ...rest } = getTableColumns(userSchema);
export const getSelectableUserFields = rest;

export type User = Omit<InferSelectModel<typeof userSchema>, "password">;
