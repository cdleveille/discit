import { RequestMethod } from "@constants";

export type Config = {
	API_URL: string;
	API_KEY: string;
};

export type RequestMethodType = keyof typeof RequestMethod;

export type Disc = {
	id: string;
	name: string;
	brand: string;
	category: string;
	speed: string;
	glide: string;
	turn: string;
	fade: string;
	stability: string;
	link: string;
	pic: string;
	name_slug: string;
	brand_slug: string;
	category_slug: string;
	stability_slug: string;
	color: string;
	background_color: string;
};

export type DiscContextType = {
	discs: Disc[];
	filteredDiscs: Disc[];
	setFilteredDiscs: (discs: Disc[]) => void;
};
