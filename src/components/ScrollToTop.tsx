"use client";

import { useEffect, useState } from "react";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { IconButton } from "@mui/material";

export const ScrollToTop = () => {
	const [isVisible, setIsVisible] = useState(false);

	const scrollToTop = (behavior: ScrollBehavior = "smooth") => window.scrollTo({ top: 0, behavior });

	useEffect(() => {
		scrollToTop();
		const determineVisibility = () => setIsVisible(window.scrollY > 500 ? true : false);
		window.addEventListener("scroll", determineVisibility);
		return () => window.removeEventListener("scroll", determineVisibility);
	}, []);

	if (!isVisible) return null;

	return (
		<div className="scroll-to-top">
			<IconButton aria-label="scroll-to-top" onClick={() => scrollToTop()}>
				<ArrowUpwardIcon fontSize="large" />
			</IconButton>
		</div>
	);
};
