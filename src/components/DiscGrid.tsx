"use client";

import { useContext, useEffect, useState } from "react";

import { Disc, DiscContext } from "@components";

const DISC_INCREMENT = 100;

export const DiscGrid = () => {
	const [numDiscsToRender, setNumDiscsToRender] = useState(DISC_INCREMENT);

	const { filteredDiscs } = useContext(DiscContext);

	useEffect(() => {
		const checkIfAtBottom = () => {
			const discGrid = document.getElementById("disc-grid");
			if (!discGrid) return;
			const scrollDiff =
				discGrid.offsetTop + discGrid.clientHeight - window.innerHeight - document.documentElement.scrollTop;
			if (scrollDiff <= 1) renderMoreDiscs();
		};
		window.addEventListener("scroll", checkIfAtBottom);
		return () => window.removeEventListener("scroll", checkIfAtBottom);
	}, []);

	useEffect(() => setNumDiscsToRender(DISC_INCREMENT), [filteredDiscs]);

	const renderMoreDiscs = () => setNumDiscsToRender(current => current + DISC_INCREMENT);

	const discs = filteredDiscs.slice(0, numDiscsToRender);

	return (
		<div id="disc-grid" className="disc-grid">
			{discs.map(disc => (
				<Disc key={disc.id} disc={disc} />
			))}
		</div>
	);
};
