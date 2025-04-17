import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";

import { AppProvider } from "@/components/AppProvider";
import { Body } from "@/components/Body";
import { Header } from "@/components/Header";
import { Loader } from "@/components/Loader";
import { APP_INFO } from "@/constants";
import { ClerkProvider } from "@clerk/nextjs";
import { Suspense } from "react";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"]
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"]
});

export const metadata: Metadata = {
	title: APP_INFO.title,
	description: APP_INFO.description,
	authors: APP_INFO.author
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<ClerkProvider>
					<AppProvider>
						<Header />
						<Suspense fallback={<Loader size={150} className="centered" />}>
							<Body />
						</Suspense>
						{children}
						<Toaster position="bottom-center" toastOptions={{ duration: 3000 }} />
					</AppProvider>
				</ClerkProvider>
			</body>
		</html>
	);
}
