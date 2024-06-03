"use client";

import Link from "next/link";

import { useAuth } from "@clerk/nextjs";
import { DiscCount } from "@components";
import { View } from "@constants";
import { useDiscContext } from "@hooks";
import AddIcon from "@mui/icons-material/Add";
import Backpack from "@mui/icons-material/Backpack";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, Stack } from "@mui/material";

export const Controls = () => {
	const { isSignedIn } = useAuth();
	const { view, setView } = useDiscContext();
	const isBagsView = view === View.BAGS;

	return (
		<Stack direction="row" justifyContent="center" alignItems="center" className="controls">
			{isBagsView && isSignedIn && <div className="add-bag-btn"></div>}
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
			{isBagsView && isSignedIn && (
				<Link href="/bag/new" className="add-bag-btn">
					<IconButton aria-label="search">
						<AddIcon fontSize="large" />
					</IconButton>
				</Link>
			)}
		</Stack>
	);
};
