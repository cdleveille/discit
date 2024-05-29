"use client";

import { createContext, useState } from "react";

import { DiscGrid } from "@components";

import type { Disc, DiscContextType } from "@types";

export const DiscContext = createContext<DiscContextType>({
	discs: [],
	filteredDiscs: [],
	setFilteredDiscs: () => null
});

type DiscGridContainerProps = {
	discs: Disc[];
};

export const DiscContextProvider = ({ discs }: DiscGridContainerProps) => {
	const [filteredDiscs, setFilteredDiscs] = useState<Disc[]>(discs);

	return (
		<DiscContext.Provider value={{ discs, filteredDiscs, setFilteredDiscs }}>
			<DiscGrid />
		</DiscContext.Provider>
	);
};
