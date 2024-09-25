import type { PropsWithChildren } from "react";

export default function UsersLayout({ children }: PropsWithChildren) {
	return (
		<div className="w-full">
			<div className="container lg:px-8 py-8 mx-auto">{children}</div>
		</div>
	);
}
