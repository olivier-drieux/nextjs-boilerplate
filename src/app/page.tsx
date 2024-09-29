import SignOutButton from "@/components/sign-out-button";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";
import Link from "next/link";

export default function Home() {
	return (
		<div className="h-screen w-screen flex flex-col items-center justify-center gap-10">
			<Button asChild>
				<Link href="/users/infinite-scroll">Infinite scroll</Link>
			</Button>
			<Button asChild>
				<Link href="/users/table">Table</Link>
			</Button>
			<Button asChild>
				<Link href="/auth">Authentication</Link>
			</Button>
			<SignOutButton />
		</div>
	);
}
