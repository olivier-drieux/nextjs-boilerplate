import Link from "next/link";

export default function Home() {
	return (
		<div>
			<Link href="/users/infinite-scroll">Infinite scroll</Link>
			<Link href="/users/table">Table</Link>
		</div>
	);
}
