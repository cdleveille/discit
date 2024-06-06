"use client";

import { useEffect, useState } from "react";

import { useAuth } from "@clerk/nextjs";
import { BagList, Disc, IconButton } from "@components";
import { SCROLL_INCREMENT, View } from "@constants";
import { useAppContext } from "@hooks";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Popover, Stack, Zoom } from "@mui/material";

export const DiscGrid = () => {
	const [numDiscsToRender, setNumDiscsToRender] = useState(SCROLL_INCREMENT);
	const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
	const [isBagListOpen, setIsBagListOpen] = useState(false);

	const { filteredDiscs, selectedBag, showSignInModal, showNewBagModal, view } = useAppContext();
	const { isSignedIn } = useAuth();

	const handleBagListClick = (event: React.MouseEvent<HTMLDivElement>) => {
		setAnchorEl(event.currentTarget);
		setIsBagListOpen(true);
	};
	const handleBagListClose = () => {
		setAnchorEl(null);
		setIsBagListOpen(false);
	};

	useEffect(() => {
		const discGrid = document.getElementById("disc-grid");
		const renderMoreDiscsIfAtBottom = () => {
			if (!discGrid) return;
			const scrollDiff =
				discGrid.offsetTop + discGrid.clientHeight - window.innerHeight - document.documentElement.scrollTop;
			if (scrollDiff <= 1 && numDiscsToRender < filteredDiscs.length) renderMoreDiscs();
		};
		window.addEventListener("scroll", renderMoreDiscsIfAtBottom);
		return () => window.removeEventListener("scroll", renderMoreDiscsIfAtBottom);
	}, [filteredDiscs.length, numDiscsToRender]);

	useEffect(() => setNumDiscsToRender(SCROLL_INCREMENT), [filteredDiscs]);

	const renderMoreDiscs = () => setNumDiscsToRender(current => current + SCROLL_INCREMENT);

	const discsToRender = filteredDiscs.slice(0, numDiscsToRender);

	const isBagView = view === View.BAG;

	if (isBagView && !selectedBag) {
		const innerHtml = !isSignedIn ? (
			<div style={{ marginTop: "1rem" }}>
				Please{" "}
				<span className="text-link" onClick={showSignInModal}>
					sign in
				</span>{" "}
				to manage bags
			</div>
		) : (
			<Stack spacing="1.5rem" alignItems="center">
				<IconButton aria-label="search" onClick={showNewBagModal}>
					<AddIcon sx={{ fontSize: "2rem" }} />
				</IconButton>
				<div>No bags added yet</div>
			</Stack>
		);
		return (
			<Zoom in={true} appear={true}>
				<div className="disc-grid-bag">{innerHtml}</div>
			</Zoom>
		);
	}

	return (
		<>
			<Stack spacing="2rem" alignItems="center" width="100%">
				{isBagView && (
					<>
						<Stack direction="row" className="bag-list-dropdown" onClick={handleBagListClick}>
							<ArrowDropUpIcon sx={{ visibility: "hidden" }} />
							<div>{selectedBag?.name}</div>
							{isBagListOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
						</Stack>
						{filteredDiscs.length === 0 && <div className="disc-grid-bag">No discs added yet</div>}
					</>
				)}
				<div id="disc-grid">
					{discsToRender.map(disc => (
						<Disc key={disc.id} disc={disc} />
					))}
				</div>
			</Stack>
			<Popover
				open={isBagListOpen}
				anchorEl={anchorEl}
				onClose={handleBagListClose}
				onBlur={handleBagListClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left"
				}}
				sx={{ marginTop: "0.5rem" }}
			>
				<BagList onClose={handleBagListClose} />
			</Popover>
		</>
	);
};
