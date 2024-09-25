"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@/lib/drizzle/schema/user-schema";
import { deleteUser } from "@/lib/functions/delete-user";
import type { Row } from "@tanstack/react-table";
import { EllipsisIcon, TrashIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";

interface UserDataTableRowActionsProps {
	row: Row<User>;
}

export function UserDataTableRowAction({ row }: UserDataTableRowActionsProps) {
	const { toast } = useToast();
	const action = useAction(deleteUser, {
		onSuccess: ({ input }) => {
			toast({
				duration: 10000000,
				title: "User deleted",
				description: `User ${input.id} was deleted successfully`,
			});
		},
	});

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
				>
					<EllipsisIcon className="h-4 w-4" />
					<span className="sr-only">Open menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[160px]">
				<DropdownMenuItem
					className="bg-destructive text-destructive-foreground focus:text-destructive-foreground focus:bg-destructive/80"
					onClick={() => action.execute({ id: row.original.id })}
				>
					<TrashIcon className="h-3 w-3 mr-2" />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
