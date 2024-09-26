"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { deleteUser } from "@/lib/functions/delete-user";
import { Loader2Icon, TrashIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";

interface DeleteUserButtonProps {
	userId: number;
	onSuccess?: () => void;
}

export function DeleteUserButton({ userId, onSuccess }: DeleteUserButtonProps) {
	const { toast } = useToast();

	const action = useAction(deleteUser, {
		onSuccess: ({ input }) => {
			onSuccess?.();
			toast({
				duration: 10000000,
				title: "User deleted",
				description: `User ${input.id} was deleted successfully`,
			});
		},
		onError: () => {
			toast({
				title: "Error",
				description:
					"An error occurred during user deletion process. Please try again.",
				variant: "destructive",
			});
		},
	});

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="destructive" size="icon" disabled={action.isPending}>
					{action.isPending ? (
						<Loader2Icon className="h-4 w-4 animate-spin" />
					) : (
						<TrashIcon className="h-4 w-4" />
					)}
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						className={buttonVariants({ variant: "destructive" })}
						onClick={() => action.execute({ id: userId })}
					>
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
