"use client";

import { signOut } from "@/lib/auth";
import { Button } from "./ui/button";

export default function SignOutButton() {
	return <Button onClick={() => signOut({ redirectTo: "/" })}>Sign out</Button>;
}
