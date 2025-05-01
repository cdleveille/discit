import Backpack from "@mui/icons-material/Backpack";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";

import { DiscCount, Tooltip } from "@components";
import { View } from "@constants";
import { useAppContext } from "@hooks";

export const Controls = () => {
	const { view, setView } = useAppContext();
	const isSearchView = view === View.Search;
	const isBagView = view === View.Bag;

	return (
		<div className="controls">
			<Tooltip title="Search">
				<IconButton
					aria-label="Search"
					className={isSearchView ? "icon-btn-selected" : "icon-btn"}
					onClick={() => setView(View.Search)}
				>
					<SearchIcon sx={{ fontSize: "2rem" }} />
				</IconButton>
			</Tooltip>
			<DiscCount />
			<Tooltip title="Bag">
				<IconButton
					aria-label="Bag"
					className={isBagView ? "icon-btn-selected" : "icon-btn"}
					onClick={() => setView(View.Bag)}
				>
					<Backpack sx={{ fontSize: "2rem" }} />
				</IconButton>
			</Tooltip>
		</div>
	);
};
