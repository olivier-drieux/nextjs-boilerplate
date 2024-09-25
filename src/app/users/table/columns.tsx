"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import type { User } from "@/lib/drizzle/schema/user-schema";
import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { UserDataTableRowAction } from "./user-data-table-row-actions";

export const columns: ColumnDef<User>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "username",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Username" />
		),
	},
	{
		accessorKey: "email",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Email" />
		),
	},
	{
		accessorKey: "createdAt",
		accessorFn: (row) => dayjs(row.createdAt).format("YYYY-MM-DD HH:mm:ss"),
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Created at" />
		),
	},
	{
		accessorKey: "updatedAt",
		accessorFn: (row) => dayjs(row.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Updated at" />
		),
	},
	{
		id: "actions",
		cell: ({ row }) => <UserDataTableRowAction row={row} />,
	},
];
