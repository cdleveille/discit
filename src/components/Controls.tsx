"use client";

import { DiscCount } from "@components";
import { View } from "@constants";
import { useAppContext } from "@hooks";
import Backpack from "@mui/icons-material/Backpack";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, Stack } from "@mui/material";

export const Controls = () => {
	const { view, setView } = useAppContext();
	const isSearchView = view === View.SEARCH;
	const isBagView = view === View.BAG;

	return (
		<Stack direction="row" justifyContent="center" alignItems="center" className="controls">
			<div className={isSearchView ? "selected-view" : ""} onClick={() => setView(View.SEARCH)}>
				<IconButton aria-label="search">
					<SearchIcon fontSize="large" />
				</IconButton>
			</div>
			<DiscCount />
			<div className={isBagView ? "selected-view" : ""} onClick={() => setView(View.BAG)}>
				<IconButton aria-label="bag">
					<Backpack fontSize="large" />
				</IconButton>
			</div>
		</Stack>
	);
};
