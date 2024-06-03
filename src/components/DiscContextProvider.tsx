"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { View } from "@constants";
import { DiscContext } from "@contexts";

import type { Bag, DiscContextProviderProps, FilterValues, ViewOption } from "@types";
export const DiscContextProvider = ({ discs: _discs, bags: _bags, children }: DiscContextProviderProps) => {
	const searchParams = useSearchParams();
	const viewParam = searchParams.get("view") as ViewOption;
	const nameParam = searchParams.get("name");

	const [discs, setDiscs] = useState(_discs);
	const [filteredDiscs, setFilteredDiscs] = useState(discs);
	const [bags, setBags] = useState(_bags);
	const [selectedBag, setSelectedBag] = useState<Bag | null>(null);
	const [filterValues, setFilterValues] = useState<FilterValues>({
		name: nameParam ?? "",
		brands: [],
		categories: [],
		stabilities: [],
		speeds: [],
		glides: [],
		turns: [],
		fades: []
	});
	const [view, setView] = useState<ViewOption>(viewParam ?? View.SEARCH);

	return (
		<DiscContext.Provider
			value={{
				discs,
				setDiscs,
				filteredDiscs,
				setFilteredDiscs,
				bags,
				setBags,
				selectedBag,
				setSelectedBag,
				filterValues,
				setFilterValues,
				view,
				setView
			}}
		>
			{children}
		</DiscContext.Provider>
	);
};
