import { useAuth } from "@clerk/clerk-react";
import ArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Popover, Stack } from "@mui/material";
import { useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";

import { BagList, DiscCard, Tooltip } from "@components";
import { SCROLL_INCREMENT, View } from "@constants";
import { useAppContext } from "@hooks";

export const DiscGrid = () => {
	const [numDiscsToRender, setNumDiscsToRender] = useState(SCROLL_INCREMENT);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const [isBagListOpen, setIsBagListOpen] = useState(false);

	const { filteredDiscs, selectedBag, showSignInModal, showBagAddModal, view, isSortAZ } =
		useAppContext();
	const { isSignedIn, isLoaded } = useAuth();

	const handleBagListClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
		setIsBagListOpen(true);
	};

	const handleBagListClose = () => {
		setAnchorEl(null);
		setIsBagListOpen(false);
	};

	const renderMoreDiscs = () => setNumDiscsToRender(current => current + SCROLL_INCREMENT);

	const hasMoreDiscsToRender = numDiscsToRender < filteredDiscs.length;

	const sortedDiscs = isSortAZ ? filteredDiscs : [...filteredDiscs].reverse();

	const discsToRender = sortedDiscs.slice(0, numDiscsToRender);

	const isBagView = view === View.Bag;

	const [sentryRef] = useInfiniteScroll({
		loading: false,
		hasNextPage: hasMoreDiscsToRender,
		disabled: !hasMoreDiscsToRender,
		onLoadMore: renderMoreDiscs,
		rootMargin: "0px 0px 16px 0px",
		delayInMs: 10
	});

	if (!isLoaded) return null;

	if (isBagView && !selectedBag) {
		const innerHtml = !isSignedIn ? (
			<p className="disc-grid-info">
				Please{" "}
				<button
					type="button"
					className="link-button"
					onClick={e => {
						e.preventDefault();
						showSignInModal();
					}}
				>
					sign in
				</button>{" "}
				to manage bags
			</p>
		) : (
			<button type="button" className="link-button" onClick={showBagAddModal}>
				Add new bag
			</button>
		);
		return <div className="disc-grid-info">{innerHtml}</div>;
	}

	return (
		<>
			<Stack spacing="1rem" alignItems="center" width="100%">
				{isBagView && (
					<Stack spacing="1rem" alignItems="center" width="100%">
						<Tooltip title="Manage Bags">
							<button
								type="button"
								onClick={handleBagListClick}
								className="bag-list-dropdown"
							>
								<div
									style={{
										position: "absolute",
										left: "-1.75rem",
										top: "0.16rem"
									}}
								>
									{isBagListOpen ? <ArrowDownIcon /> : <ArrowRightIcon />}
								</div>
								<div>{selectedBag?.name}</div>
							</button>
						</Tooltip>
						{filteredDiscs.length === 0 && (
							<p className="disc-grid-info">No discs added yet</p>
						)}
					</Stack>
				)}
				<>
					<div id="disc-grid">
						{discsToRender.map(disc => (
							<DiscCard key={disc.id} disc={disc} />
						))}
					</div>
					{hasMoreDiscsToRender && <div ref={sentryRef} />}
				</>
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
				disableScrollLock
			>
				<BagList onClose={handleBagListClose} />
			</Popover>
		</>
	);
};
