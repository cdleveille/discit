import type { Dispatch, SetStateAction } from "react";
import type * as shared from "discit-types";

import { View } from "@constants";

export type Disc = shared.Disc;
export type Bag = shared.Bag;

export * from "./request";
export * from "./props";

export type Config = {
	API_URL: string;
	API_KEY: string;
};

export type ViewOption = `${View}`;

export type AppContext = {
	discs: Disc[];
	setDiscs: Dispatch<SetStateAction<Disc[]>>;
	filteredDiscs: Disc[];
	setFilteredDiscs: Dispatch<SetStateAction<Disc[]>>;
	bags: Bag[];
	selectedBag: Bag | null;
	setSelectedBag: Dispatch<SetStateAction<Bag | null>>;
	filterValues: FilterValues;
	setFilterValues: Dispatch<SetStateAction<FilterValues>>;
	filtersEnabled: FiltersEnabled;
	setFiltersEnabled: Dispatch<SetStateAction<FiltersEnabled>>;
	showSignInModal: () => void;
	showDiscDetailModal: (disc: Disc) => void;
	showNewBagModal: () => void;
	showEditBagModal: (bag: Bag) => void;
	showBagDeleteModal: (bag: Bag) => void;
	showSettingsModal: () => void;
	view: ViewOption;
	setView: Dispatch<SetStateAction<ViewOption>>;
};

export type FilterOptions = {
	names: string[];
	brand: string[];
	category: string[];
	stability: string[];
	speed: string[];
	glide: string[];
	turn: string[];
	fade: string[];
};

export type FilterValues = {
	name: string;
	brand: string[];
	category: string[];
	stability: string[];
	speed: string[];
	glide: string[];
	turn: string[];
	fade: string[];
};

export type FiltersEnabled = {
	name: boolean;
	brand: boolean;
	category: boolean;
	stability: boolean;
	speed: boolean;
	glide: boolean;
	turn: boolean;
	fade: boolean;
};
