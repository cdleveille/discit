import "./globals.css";

import { Inter } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";
import { DiscContextProvider } from "@components";
import { METADATA, VIEWPORT } from "@constants";
import { getBags, getDiscs } from "@services/api";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
	children,
	discModal,
	signInModal,
	newBagModal
}: Readonly<{
	children: React.ReactNode;
	discModal: React.ReactNode;
	signInModal: React.ReactNode;
	newBagModal: React.ReactNode;
}>) {
	const [discs, bags] = await Promise.all([getDiscs(), getBags({ userId: null })]);
	return (
		<ClerkProvider>
			<DiscContextProvider discs={discs} bags={bags}>
				<html lang="en">
					<body className={inter.className}>
						{children}
						{discModal}
						{signInModal}
						{newBagModal}
					</body>
				</html>
			</DiscContextProvider>
		</ClerkProvider>
	);
}

export const metadata = METADATA;
export const viewport = VIEWPORT;
