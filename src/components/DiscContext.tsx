"use client";

import { createContext, useState } from "react";

import type { Disc, DiscContextProviderProps, FilterValues, DiscContext as TDiscContext } from "@types";

export const DiscContext = createContext<TDiscContext>({
	discs: [],
	filteredDiscs: [],
	setFilteredDiscs: () => {},
	filterValues: {
		name: "",
		brands: [],
		categories: [],
		stabilities: []
	},
	setFilterValues: () => {}
});

export const DiscContextProvider = ({ discs, children }: DiscContextProviderProps) => {
	const [filteredDiscs, setFilteredDiscs] = useState<Disc[]>(discs);
	const [filterValues, setFilterValues] = useState<FilterValues>({
		name: "",
		brands: [],
		categories: [],
		stabilities: []
	});

	if (!discs) return null;

	return (
		<DiscContext.Provider
			value={{
				discs,
				filteredDiscs,
				setFilteredDiscs,
				filterValues,
				setFilterValues
			}}
		>
			{children}
		</DiscContext.Provider>
	);
};
