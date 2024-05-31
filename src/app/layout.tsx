import "./globals.css";

import { Inter } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => (
	<ClerkProvider>
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	</ClerkProvider>
);

export default RootLayout;
