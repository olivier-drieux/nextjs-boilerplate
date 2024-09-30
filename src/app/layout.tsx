import { Providers } from "@/components/providers";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "../stack";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Next.js boilerplate",
	description: "Next.js boilerplate",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={cn(
					geistSans.variable,
					geistMono.variable,
					"antialiased min-h-screen w-full",
				)}
			><StackProvider app={stackServerApp}><StackTheme>
				<Providers>
					<main>{children}</main>
					<Toaster />
				</Providers>
			</StackTheme></StackProvider></body>
		</html>
	);
}
