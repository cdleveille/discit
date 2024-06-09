"use client";

import { useEffect, useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";

import { useAuth } from "@clerk/nextjs";
import { BagList, Disc, IconButton } from "@components";
import { SCROLL_INCREMENT, View } from "@constants";
import { useAppContext } from "@hooks";
import AddIcon from "@mui/icons-material/Add";
import ArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Popover, Stack } from "@mui/material";

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

	const firstDisc = filteredDiscs[0];

	useEffect(() => {
		setNumDiscsToRender(SCROLL_INCREMENT);
	}, [filteredDiscs.length, firstDisc]);

	const renderMoreDiscs = () => setNumDiscsToRender(current => current + SCROLL_INCREMENT);

	const hasMoreDiscsToRender = numDiscsToRender < filteredDiscs.length;

	const discsToRender = filteredDiscs.slice(0, numDiscsToRender);

	const isBagView = view === View.BAG;

	const [sentryRef] = useInfiniteScroll({
		loading: false,
		hasNextPage: hasMoreDiscsToRender,
		disabled: !hasMoreDiscsToRender,
		onLoadMore: renderMoreDiscs,
		rootMargin: "0px 0px 16px 0px",
		delayInMs: 10
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
		return <div className="disc-grid-bag">{innerHtml}</div>;
	}

	return (
		<>
			<Stack spacing="2rem" alignItems="center" width="100%">
				{isBagView && (
					<Stack spacing="2rem" alignItems="center" width="100%">
						<Stack direction="row" className="bag-list-dropdown" onClick={handleBagListClick}>
							{isBagListOpen ? <ArrowDownIcon /> : <ArrowRightIcon />}
							<div>{selectedBag?.name}</div>
						</Stack>
						{filteredDiscs.length === 0 && <div className="disc-grid-bag">No discs added yet</div>}
					</Stack>
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
				disableScrollLock
			>
				<BagList onClose={handleBagListClose} />
			</Popover>
		</>
	);
};
