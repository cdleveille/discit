import React, { CSSProperties } from "react";

import BackpackIcon from "@mui/icons-material/Backpack";
import IconButton from "@mui/material/IconButton";

interface IBagButtonProps {
	onClick: () => void;
	style?: CSSProperties;
}

export const BagButton = ({ onClick, style }: IBagButtonProps) => {
	return (
		<div className="bag-btn">
			<IconButton aria-label="Menu" onClick={onClick} size="medium" style={style}>
				<BackpackIcon />
			</IconButton>
		</div>
	);
};
