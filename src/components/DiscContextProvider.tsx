"use client";

import { createContext, useState } from "react";

import { DiscCount, DiscDetail, DiscGrid, Filters, Header } from "@components";

import type { Disc, DiscContext as TDiscContext, DiscContextProviderProps, FilterValues } from "@types";

export const DiscContext = createContext<TDiscContext>({} as TDiscContext);

export const DiscContextProvider = ({ discs }: DiscContextProviderProps) => {
	const [filteredDiscs, setFilteredDiscs] = useState<Disc[]>(discs);
	const [discDetail, setDiscDetail] = useState<Disc | null>(null);
	const [filterValues, setFilterValues] = useState<FilterValues>({
		name: "",
		brands: [],
		categories: [],
		stabilities: []
	});

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
			<Header />
			<Filters />
			<DiscCount />
			<DiscGrid />
			<DiscDetail />
		</DiscContext.Provider>
	);
};
