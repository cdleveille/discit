import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";

import { Tooltip } from "@components";
import { useAppContext } from "@hooks";

export const ScrollToTop = () => {
	const [isVisible, setIsVisible] = useState(false);

	const { modalContent } = useAppContext();

	const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

	useEffect(() => {
		const determineVisibility = () => setIsVisible(window.scrollY > 500);
		window.addEventListener("scroll", determineVisibility);
		return () => window.removeEventListener("scroll", determineVisibility);
	}, []);

	if (!isVisible || modalContent) return null;

	return (
		<div className="scroll-to-top">
			<Tooltip title="Scroll to top">
				<IconButton className="icon-btn" aria-label="Scroll to top" onClick={scrollToTop}>
					<ArrowUpwardIcon sx={{ fontSize: "2rem" }} />
				</IconButton>
			</Tooltip>
		</div>
	);
};
