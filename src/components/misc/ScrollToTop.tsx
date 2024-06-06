"use client";

import { useEffect, useState } from "react";

import { IconButton } from "@components";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export const ScrollToTop = () => {
	const [isVisible, setIsVisible] = useState(false);

	const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

	useEffect(() => {
		scrollToTop();
		const determineVisibility = () => setIsVisible(window.scrollY > 500 ? true : false);
		window.addEventListener("scroll", determineVisibility);
		return () => window.removeEventListener("scroll", determineVisibility);
	}, []);

	if (!isVisible) return null;

	return (
		<IconButton className="scroll-to-top" aria-label="scroll-to-top" onClick={scrollToTop}>
			<ArrowUpwardIcon sx={{ fontSize: "2rem" }} />
		</IconButton>
	);
};
