import type { TFilterValues, TFiltersEnabled } from "@types";

export enum Env {
	Production = "production",
	Development = "development"
}

export enum Path {
	Public = "public",
	ClientSrc = "src/client"
}

export enum SocketEvent {
	Connect = "connect",
	Reload = "reload"
}

export enum View {
	Search = "search",
	Bag = "bag"
}

export enum ErrorMessage {
	InternalServerError = "Internal Server Error"
}

export enum QueryKey {
	GetDiscs = "get-discs",
	GetBags = "get-bags"
}

export const STORED_STATE_PREFIX = "discit";

export const APP_INFO = {
	title: "DiscIt",
	description: "A responsive disc golf disc search engine.",
	author: {
		name: "Chris Leveille",
		email: "cdleveille@gmail.com",
		url: "https://www.cdleveille.net"
	},
	url: "https://discit.app"
} as const;

export const SCROLL_INCREMENT = 100;

export const INITIAL_FILTER_VALUES: TFilterValues = {
	name: "",
	brand: [],
	category: [],
	stability: [],
	speed: [],
	glide: [],
	turn: [],
	fade: []
};

export const INITIAL_FILTERS_ENABLED: TFiltersEnabled = {
	name: false,
	brand: false,
	category: false,
	stability: false,
	speed: false,
	glide: false,
	turn: false,
	fade: false
};
