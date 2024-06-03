"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuth } from "@clerk/nextjs";
import { View } from "@constants";
import { DiscContext } from "@contexts";

import type { Bag, DiscContextProviderProps, FilterValues, ViewOption } from "@types";
export const DiscContextProvider = ({ discs: _discs, bags: allBags, children }: DiscContextProviderProps) => {
	const { userId } = useAuth();
	const searchParams = useSearchParams();
	const viewParam = searchParams.get("view") as ViewOption;
	const nameParam = searchParams.get("name");

	const [discs, setDiscs] = useState(_discs);
	const [filteredDiscs, setFilteredDiscs] = useState(discs);

	const [bags, setBags] = useState<Bag[]>([]);
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

	useEffect(() => {
		const userBags = userId ? allBags.filter(({ user_id }) => user_id === userId) : [];
		setBags(userBags);
		setSelectedBag(userBags[0] ?? null);
	}, [userId, allBags]);

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
