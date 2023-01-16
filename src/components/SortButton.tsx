import React from "react";

import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import IconButton from "@mui/material/IconButton";

interface ISortButtonProps {
	onClick: () => void;
}

export const SortButton = ({ onClick }: ISortButtonProps) => {
	return (
		<div className="sort-btn">
			<IconButton aria-label="Toggle sort order" onClick={onClick} size="small">
				<SortByAlphaIcon />
			</IconButton>
		</div>
	);
};
