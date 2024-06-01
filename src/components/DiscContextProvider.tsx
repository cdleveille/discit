"use client";

import { useState } from "react";

import { DiscContext } from "@contexts";

import type { Disc, DiscContextProviderProps, FilterValues, DiscContext as TDiscContext } from "@types";

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
