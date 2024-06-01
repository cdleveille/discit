import "./globals.css";

import { Inter } from "next/font/google";

import { DiscContextProvider } from "@components";
import { API } from "@services";

import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
	children,
	modal
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
}>) {
	const discs = await API.getDiscs();
	return (
		<DiscContextProvider discs={discs}>
			<html lang="en">
				<body className={inter.className}>
					{children}
					{modal}
					<div id="modal-root" />
				</body>
			</html>
		</DiscContextProvider>
	);
}

export const metadata: Metadata = {
	title: "DiscIt",
	description: "A responsive disc golf disc search engine.",
	authors: { name: "Chris Leveille", url: "https://www.cdleveille.net" },
	publisher: "Chris Leveille",
	openGraph: {
		title: "DiscIt",
		description: "A responsive disc golf disc search engine.",
		type: "website",
		emails: "cdleveille@gmail.com",
		url: "https://discit.vercel.app",
		images: {
			url: "https://github.com/cdleveille/discit/assets/1410481/ce638b92-5142-4b1c-814a-5240e3cf8fde",
			secureUrl: "https://github.com/cdleveille/discit/assets/1410481/ce638b92-5142-4b1c-814a-5240e3cf8fde",
			type: "image/png",
			alt: "DiscIt",
			width: 256,
			height: 256
		}
	}
};
