import "./globals.css";

import { Inter } from "next/font/google";

import { DiscContextProvider } from "@components";
import { useApi } from "@hooks";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { getDiscs } = useApi();
	const discs = await getDiscs();
	return (
		<html lang="en">
			<body className={inter.className}>
				<DiscContextProvider discs={discs}>{children}</DiscContextProvider>
			</body>
		</html>
	);
}
