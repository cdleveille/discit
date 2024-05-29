import type { Metadata } from "next";

import { Home } from "@components";

const HomePage = () => <Home />;

export default HomePage;

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
