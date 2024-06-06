import { url } from "inspector";
import { Metadata, Viewport } from "next";

import type { FilterValues, FiltersEnabled } from "@types";
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

export const INITIAL_FILTERS_ENABLED: FiltersEnabled = {
	name: true,
	brand: true,
	category: true,
	stability: true,
	speed: false,
	glide: false,
	turn: false,
	fade: false
};

const APP_INFO = {
	title: "DiscIt",
	description: "A responsive disc golf disc search engine.",
	author: { name: "Chris Leveille", email: "cdleveille@gmail.com", url: "https://www.cdleveille.net" },
	url: "https://discit.vercel.app"
};

export const METADATA: Metadata = {
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

export const VIEWPORT: Viewport = {
	themeColor: "#ffffff"
};
