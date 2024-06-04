"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuth } from "@clerk/nextjs";
import { INITIAL_FILTER_VALUES, View } from "@constants";
import { DiscContext } from "@contexts";

import type { Bag, DiscContextProviderProps, FilterValues, ViewOption } from "@types";
export const DiscContextProvider = ({ children, discs: _discs, bags: allBags }: DiscContextProviderProps) => {
	const { userId } = useAuth();
	const searchParams = useSearchParams();
	const viewParam = searchParams.get("view") as ViewOption;

	const [discs, setDiscs] = useState(_discs);
	const [filteredDiscs, setFilteredDiscs] = useState(discs);

	const [bags, setBags] = useState<Bag[]>([]);
	const [selectedBag, setSelectedBag] = useState<Bag | null>(null);
	const [filterValues, setFilterValues] = useState<FilterValues>(INITIAL_FILTER_VALUES);
	const [view, setView] = useState<ViewOption>(viewParam ?? View.SEARCH);

	useEffect(() => {
		const userBags = userId ? allBags.filter(({ user_id }) => user_id === userId) : [];
		setBags(userBags);
		setSelectedBag(userBags[0] ?? null);
	}, [userId, allBags]);

	useEffect(() => {
		setSelectedBag(bags[bags.length - 1] ?? null);
	}, [bags]);

	useEffect(() => {
		setFilterValues(INITIAL_FILTER_VALUES);
	}, [view]);

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
