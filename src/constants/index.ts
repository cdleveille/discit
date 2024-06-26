import { Metadata, Viewport } from "next";

import type { FilterValues, FiltersEnabled } from "@types";

export enum RequestMethod {
	GET = "GET",
	POST = "POST",
	PATCH = "PATCH",
	DELETE = "DELETE"
}

export enum View {
	SEARCH = "search",
	BAG = "bag"
}

export const SCROLL_INCREMENT = 100;

export const INITIAL_FILTER_VALUES: FilterValues = {
	name: "",
	brand: [],
	category: [],
	stability: [],
	speed: [],
	glide: [],
	turn: [],
	fade: []
};

export const INITIAL_FILTERS_ENABLED: FiltersEnabled = {
	name: false,
	brand: false,
	category: false,
	stability: false,
	speed: false,
	glide: false,
	turn: false,
	fade: false
};

export const APP_INFO = {
	title: "DiscIt",
	description: "A responsive disc golf disc search engine.",
	author: { name: "Chris Leveille", email: "cdleveille@gmail.com", url: "https://www.cdleveille.net" },
	url: "https://discit.vercel.app"
};
