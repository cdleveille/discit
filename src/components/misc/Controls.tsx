"use client";

import { DiscCount, IconButton } from "@components";
import { View } from "@constants";
import { useAppContext, useQueryString } from "@hooks";
import Backpack from "@mui/icons-material/Backpack";
import SearchIcon from "@mui/icons-material/Search";
import { Stack } from "@mui/material";

export const Controls = () => {
	const { view, setView } = useAppContext();
	const { updateQueryString } = useQueryString();
	const isSearchView = view === View.SEARCH;
	const isBagView = view === View.BAG;

	return (
		<Stack direction="row" justifyContent="center" alignItems="center" className="controls">
			<IconButton
				aria-label="search"
				className={isSearchView ? "icon-btn-selected" : ""}
				onClick={() => {
					setView(View.SEARCH);
					updateQueryString("view", null);
				}}
			>
				<SearchIcon sx={{ fontSize: "2rem" }} />
			</IconButton>
			<DiscCount />
			<IconButton
				aria-label="bag"
				className={isBagView ? "icon-btn-selected" : ""}
				onClick={() => {
					setView(View.BAG);
					updateQueryString("view", "bag");
				}}
			>
				<Backpack sx={{ fontSize: "2rem" }} />
			</IconButton>
		</Stack>
	);
};
