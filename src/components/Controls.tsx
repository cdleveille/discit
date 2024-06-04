"use client";

import Link from "next/link";

import { DiscCount } from "@components";
import { View } from "@constants";
import { useView } from "@hooks";
import Backpack from "@mui/icons-material/Backpack";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, Stack } from "@mui/material";

export const Controls = () => {
	const { isSearchView, isBagView } = useView();

	return (
		<Stack direction="row" justifyContent="center" alignItems="center" className="controls">
			<Link href="/" className={isSearchView ? "selected-view" : ""}>
				<IconButton aria-label="search">
					<SearchIcon fontSize="large" />
				</IconButton>
			</Link>
			<DiscCount />
			<Link href={`?view=${View.BAG}`} className={isBagView ? "selected-view" : ""}>
				<IconButton aria-label="bag">
					<Backpack fontSize="large" />
				</IconButton>
			</Link>
		</Stack>
	);
};
