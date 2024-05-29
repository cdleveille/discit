"use client";

import { useEffect, useState } from "react";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { IconButton } from "@mui/material";

export const ScrollToTop = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const determineVisibility = () => setIsVisible(window.scrollY > 500 ? true : false);
		window.addEventListener("scroll", determineVisibility);
		return () => window.removeEventListener("scroll", determineVisibility);
	}, []);

	if (!isVisible) return null;

	return (
		<IconButton
			aria-label="scrollTop"
			onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
			size="large"
			className="scroll-to-top"
		>
			<ArrowUpwardIcon />
		</IconButton>
	);
};
