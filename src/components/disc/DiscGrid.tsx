"use client";

import { useEffect, useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";

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

	useEffect(() => setNumDiscsToRender(SCROLL_INCREMENT), [filteredDiscs]);

	const renderMoreDiscs = () => setNumDiscsToRender(current => current + SCROLL_INCREMENT);

	const hasMoreDiscsToRender = numDiscsToRender < filteredDiscs.length;

	const discsToRender = filteredDiscs.slice(0, numDiscsToRender);

	const isBagView = view === View.BAG;

	const [sentryRef] = useInfiniteScroll({
		loading: false,
		hasNextPage: hasMoreDiscsToRender,
		disabled: !hasMoreDiscsToRender,
		onLoadMore: renderMoreDiscs,
		rootMargin: "0px 0px 16px 0px"
	});

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
				<>
					<div id="disc-grid">
						{discsToRender.map(disc => (
							<Disc key={disc.id} disc={disc} />
						))}
					</div>
					{hasMoreDiscsToRender && <div ref={sentryRef}></div>}
				</>
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
