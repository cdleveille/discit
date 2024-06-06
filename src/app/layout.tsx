import "./globals.css";

import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

import { ClerkProvider } from "@clerk/nextjs";
import { METADATA, VIEWPORT } from "@constants";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={inter.className}>
					<Toaster position="top-center" />
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}

export const metadata = METADATA;
export const viewport = VIEWPORT;
