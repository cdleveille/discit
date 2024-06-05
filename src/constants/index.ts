import { Metadata, Viewport } from "next";

import type { FilterValues } from "@types";

export enum RequestMethod {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	DELETE = "DELETE"
}

export enum View {
	SEARCH = "search",
	BAG = "bag"
}

export const SCROLL_INCREMENT = 100;

export const INITIAL_FILTER_VALUES: FilterValues = {
	name: "",
	brands: [],
	categories: [],
	stabilities: [],
	speeds: [],
	glides: [],
	turns: [],
	fades: []
};

export const VIEWPORT: Viewport = {
	themeColor: "#ffffff"
};

export const METADATA: Metadata = {
	title: "DiscIt",
	description: "A responsive disc golf disc search engine.",
	authors: { name: "Chris Leveille", url: "https://www.cdleveille.net" },
	publisher: "Chris Leveille",
	manifest: "/manifest.json",
	icons: [
		"/icons/icon512-maskable.png",
		"/icons/icon512.png",
		"/icons/icon384.png",
		"/icons/icon256.png",
		"/icons/icon192-maskable.png",
		"/icons/icon192.png",
		"/icons/apple-icon.png",
		"/icons/icon152.png",
		"/icons/icon144.png",
		"/icons/icon128.png",
		"/icons/icon96.png",
		"/icons/icon72.png",
		"/icons/icon32.png",
		"/icons/icon16.png"
	],
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
