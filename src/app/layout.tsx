import "./globals.css";

import { Inter } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";
import { AppContextProvider } from "@components";
import { METADATA, VIEWPORT } from "@constants";
import { getBags, getDiscs } from "@services/api";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [discs, bags] = await Promise.all([getDiscs(), getBags({ userId: null })]);
	return (
		<ClerkProvider>
			<AppContextProvider discs={discs} bags={bags}>
				<html lang="en">
					<body className={inter.className}>{children}</body>
				</html>
			</AppContextProvider>
		</ClerkProvider>
	);
}

export const metadata = METADATA;
export const viewport = VIEWPORT;
