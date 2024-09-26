import type { User } from "@/lib/drizzle/schema/user-schema";
import { getQueryClient } from "@/lib/query-client";
import { DeleteUserButton } from "../delete-user-button";

export default function UserCard({ user }: { user: User }) {
	const queryClient = getQueryClient();
	return (
		<div className="border-8 p-4 w-60">
			<div className="card-body">
				<h5 className="card-title">{user.username}</h5>
				<h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
				<p className="card-text">
					{user.createdAt?.toLocaleDateString("fr-FR")}
				</p>
				<DeleteUserButton
					userId={user.id}
					onSuccess={() =>
						queryClient.invalidateQueries({ queryKey: ["users"] })
					}
				/>
			</div>
		</div>
	);
}
