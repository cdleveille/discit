"use client";

import { useEffect, useState } from "react";

import { useAuth } from "@clerk/nextjs";
import { BagList, Disc } from "@components";
import { SCROLL_INCREMENT } from "@constants";
import { useAppContext, useView } from "@hooks";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { IconButton, Popover, Stack, Zoom } from "@mui/material";

export const DiscGrid = () => {
	const [numDiscsToRender, setNumDiscsToRender] = useState(SCROLL_INCREMENT);
	const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

	const { filteredDiscs, selectedBag, showSignInModal, showNewBagModal } = useAppContext();
	const { isBagView } = useView();
	const { isSignedIn } = useAuth();

	const handleBagListClick = (event: React.MouseEvent<HTMLDivElement>) => setAnchorEl(event.currentTarget);
	const handleBagListClose = () => setAnchorEl(null);
	const isBagListOpen = Boolean(anchorEl);

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

	if (isBagView && !selectedBag) {
		const innerHtml = !isSignedIn ? (
			<div style={{ marginTop: "1rem" }}>
				Please{" "}
				<span className="text-link" onClick={() => showSignInModal()}>
					sign in
				</span>{" "}
				to manage bags
			</div>
		) : (
			<Stack spacing="1.5rem" alignItems="center">
				<IconButton aria-label="search" onClick={() => showNewBagModal()}>
					<AddIcon fontSize="large" />
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
			<Stack spacing="3rem" alignItems="center" width="100%">
				{isBagView && (
					<>
						<Stack direction="row" className="disc-count" onClick={handleBagListClick}>
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
