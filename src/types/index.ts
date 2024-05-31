import { Dispatch, SetStateAction } from "react";

import { RequestMethod } from "@constants";

export type Config = {
	API_URL: string;
	API_KEY: string;
	NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
};

export type RequestMethodOption = keyof typeof RequestMethod;

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

export type DiscContext = {
	discs: Disc[];
	filteredDiscs: Disc[];
	setFilteredDiscs: Dispatch<SetStateAction<Disc[]>>;
	discDetail: Disc | null;
	setDiscDetail: (disc: Disc | null) => void;
	filterValues: FilterValues;
	setFilterValues: Dispatch<SetStateAction<FilterValues>>;
};

export type FilterOptions = {
	names: string[];
	brands: string[];
	categories: string[];
	stabilities: string[];
};

export type FilterValues = {
	name: string;
	brands: string[];
	categories: string[];
	stabilities: string[];
};

export type HomeProps = {
	discs: Disc[];
};

export type DiscProps = {
	disc: Disc;
};
