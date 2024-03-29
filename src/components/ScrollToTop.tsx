import React from "react";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import IconButton from "@mui/material/IconButton";

interface IScrollToTopProps {
	visible: boolean;
}

export const ScrollToTop = ({ visible }: IScrollToTopProps) => {
	return visible ? (
		<div className="scroll-to-top">
			<IconButton
				aria-label="scrollTop"
				onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
				size="large"
			>
				<ArrowUpwardIcon />
			</IconButton>
		</div>
	) : null;
};
