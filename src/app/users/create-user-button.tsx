"use client";

import { useToast } from "@/hooks/use-toast";
import { createUserAction } from "@/lib/actions/create-user-action";
import { Loader2Icon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { Button } from "../../components/ui/button";

interface CreateUserButtonProps {
	onSuccess?: () => void;
}

export function CreateUserButton(props: CreateUserButtonProps) {
	const { toast } = useToast();

	const action = useAction(createUserAction, {
		onSuccess: () => {
			props.onSuccess?.();
			toast({
				title: "Success",
				description: "User creation successful sent to the queue.",
				variant: "default",
			});
		},
		onError: () => {
			toast({
				title: "Error",
				description:
					"An error occurred during user creation process. Please try again.",
				variant: "destructive",
			});
		},
	});

	return (
		<Button
			variant="outline"
			disabled={action.isPending}
			onClick={async () => {
				const password = Math.random().toString(36).substring(2);
				const username = Math.random().toString(36).substring(7);
				action.execute({
					username,
					email: `${username}@example.com`,
					password,
					confirmPassword: password,
				});
			}}
		>
			{action.isPending && (
				<Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
			)}
			Create random User
		</Button>
	);
}
