import type { Metadata, Viewport } from "next";
import "./globals.css";

import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

import { ClerkProvider } from "@clerk/nextjs";
import { APP_INFO } from "@constants";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={inter.className}>
					{children}
					<Toaster position="bottom-center" toastOptions={{ duration: 3000 }} />
				</body>
			</html>
		</ClerkProvider>
	);
}

export const metadata: Metadata = {
	title: APP_INFO.title,
	applicationName: APP_INFO.title,
	description: APP_INFO.description,
	authors: { name: APP_INFO.author.name, url: APP_INFO.author.url },
	publisher: APP_INFO.author.name,
	manifest: "/manifest.json",
	appleWebApp: {
		capable: true,
		statusBarStyle: "default",
		title: APP_INFO.title
	},
	openGraph: {
		title: APP_INFO.title,
		description: APP_INFO.description,
		type: "website",
		emails: APP_INFO.author.email,
		url: APP_INFO.url,
		images: {
			url: "https://github.com/cdleveille/discit/assets/1410481/ce638b92-5142-4b1c-814a-5240e3cf8fde",
			secureUrl: "https://github.com/cdleveille/discit/assets/1410481/ce638b92-5142-4b1c-814a-5240e3cf8fde",
			type: "image/png",
			alt: APP_INFO.title,
			width: 256,
			height: 256
		}
	}
};

export const viewport: Viewport = {
	themeColor: "#ffffff"
};
