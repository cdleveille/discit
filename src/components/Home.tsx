"use client";

import { createContext, useState } from "react";

import { ClerkProvider } from "@clerk/nextjs";
import { DiscCount, DiscDetail, DiscGrid, Filters, Header, ScrollToTop } from "@components";

import type { Disc, DiscContext as TDiscContext, HomeProps, FilterValues } from "@types";

export const DiscContext = createContext<TDiscContext>({} as TDiscContext);

export const Home = ({ discs }: HomeProps) => {
	const [filteredDiscs, setFilteredDiscs] = useState<Disc[]>(discs);
	const [discDetail, setDiscDetail] = useState<Disc | null>(null);
	const [filterValues, setFilterValues] = useState<FilterValues>({
		name: "",
		brands: [],
		categories: [],
		stabilities: []
	});

	return (
		<ClerkProvider>
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
				<ScrollToTop />
			</DiscContext.Provider>
		</ClerkProvider>
	);
};
