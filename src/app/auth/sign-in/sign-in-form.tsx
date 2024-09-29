"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { signInAction } from "@/lib/actions/sign-in-action";
import { type SignInSchema, signInSchema } from "@/lib/zod/sign-in-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";

interface SignInFormProps {
	csrfToken: string;
}

export default function SignInForm() {
	const form = useForm<SignInSchema>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			identifier: "",
			password: "",
		},
	});

	const action = useAction(signInAction, {
		onError: () => {
			toast({
				title: "Error",
				description:
					"An error occurred while authenticating. Please try again.",
				variant: "destructive",
			});
		},
	});

	return (
		<div className="h-screen w-screen flex flex-col items-center justify-center gap-4">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(action.execute)}
					className="w-2/3 space-y-6"
				>
					<FormField
						control={form.control}
						name="identifier"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Identifier</FormLabel>
								<FormControl>
									<Input {...field} placeholder="Username or email" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input {...field} type="password" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Sign in</Button>
				</form>
			</Form>
		</div>
	);
}
