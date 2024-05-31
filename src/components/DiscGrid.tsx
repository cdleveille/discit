"use client";

import { useContext, useEffect, useState } from "react";

import { Disc, DiscContext } from "@components";
import { SCROLL_INCREMENT } from "@constants";

export const DiscGrid = () => {
	const [numDiscsToRender, setNumDiscsToRender] = useState(SCROLL_INCREMENT);

	const { filteredDiscs } = useContext(DiscContext);

	useEffect(() => {
		const discGrid = document.getElementById("disc-grid");
		const renderMoreDiscsIfAtBottom = () => {
			if (!discGrid) return;
			const scrollDiff =
				discGrid.offsetTop + discGrid.clientHeight - window.innerHeight - document.documentElement.scrollTop;
			if (scrollDiff <= 1) renderMoreDiscs();
		};
		window.addEventListener("scroll", renderMoreDiscsIfAtBottom);
		return () => window.removeEventListener("scroll", renderMoreDiscsIfAtBottom);
	}, []);

	useEffect(() => setNumDiscsToRender(SCROLL_INCREMENT), [filteredDiscs]);

	const renderMoreDiscs = () => setNumDiscsToRender(current => current + SCROLL_INCREMENT);

	const discsToRender = filteredDiscs.slice(0, numDiscsToRender);

	return (
		<div id="disc-grid">
			{discsToRender.map(disc => (
				<Disc key={disc.id} disc={disc} />
			))}
		</div>
	);
};
