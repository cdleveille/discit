"use client";

import { createContext, useState } from "react";

import type { Disc, DiscContextProviderProps, FilterValues, DiscContext as TDiscContext } from "@types";

export const DiscContext = createContext<TDiscContext>({} as TDiscContext);

export const DiscContextProvider = ({ discs, children }: DiscContextProviderProps) => {
	const [filteredDiscs, setFilteredDiscs] = useState<Disc[]>(discs);
	const [discDetail, setDiscDetail] = useState<Disc | null>(null);
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
				discDetail,
				setDiscDetail,
				filterValues,
				setFilterValues
			}}
		>
			{children}
		</DiscContext.Provider>
	);
};
