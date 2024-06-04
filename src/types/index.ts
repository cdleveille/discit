import { Dispatch, SetStateAction } from "react";

import { View } from "@constants";

export * from "./request";
export * from "./props";

export type Config = {
	API_URL: string;
	API_KEY: string;
	NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
};

export type ViewOption = `${View}`;

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

export type Bag = {
	id: string;
	name: string;
	user_id: string;
	discs: string[];
};

export type AppContext = {
	discs: Disc[];
	setDiscs: Dispatch<SetStateAction<Disc[]>>;
	filteredDiscs: Disc[];
	setFilteredDiscs: Dispatch<SetStateAction<Disc[]>>;
	bags: Bag[];
	setBags: Dispatch<SetStateAction<Bag[]>>;
	selectedBag: Bag | null;
	setSelectedBag: Dispatch<SetStateAction<Bag | null>>;
	filterValues: FilterValues;
	setFilterValues: Dispatch<SetStateAction<FilterValues>>;
	view: ViewOption;
	setView: Dispatch<SetStateAction<ViewOption>>;
};

export type FilterOptions = {
	names: string[];
	brands: string[];
	categories: string[];
	stabilities: string[];
	speeds: string[];
	glides: string[];
	turns: string[];
	fades: string[];
};

export type FilterValues = {
	name: string;
	brands: string[];
	categories: string[];
	stabilities: string[];
	speeds: string[];
	glides: string[];
	turns: string[];
	fades: string[];
};
