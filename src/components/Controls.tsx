"use client";

import Link from "next/link";

import { DiscCount } from "@components";
import { View } from "@constants";
import { useAppContext } from "@hooks";
import Backpack from "@mui/icons-material/Backpack";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, Stack } from "@mui/material";

export const Controls = () => {
	const { view, setView } = useAppContext();
	const isBagsView = view === View.BAGS;

	return (
		<Stack direction="row" justifyContent="center" alignItems="center" className="controls">
			<Link href="/" className={!isBagsView ? "selected-view" : ""} onClick={() => setView(View.SEARCH)}>
				<IconButton aria-label="search">
					<SearchIcon fontSize="large" />
				</IconButton>
			</Link>
			<DiscCount />
			<Link href="/?view=bags" className={isBagsView ? "selected-view" : ""} onClick={() => setView(View.BAGS)}>
				<IconButton aria-label="bags">
					<Backpack fontSize="large" />
				</IconButton>
			</Link>
		</Stack>
	);
};
