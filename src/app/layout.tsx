import "./globals.css";

import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

import { METADATA, VIEWPORT } from "@constants";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Toaster position="bottom-center" toastOptions={{ duration: 3000 }} />
				{children}
			</body>
		</html>
	);
}

export const metadata = METADATA;
export const viewport = VIEWPORT;
