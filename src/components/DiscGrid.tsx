"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useAuth } from "@clerk/nextjs";
import { Disc } from "@components";
import { SCROLL_INCREMENT, View } from "@constants";
import { useDiscContext } from "@hooks";

export const DiscGrid = () => {
	const [numDiscsToRender, setNumDiscsToRender] = useState(SCROLL_INCREMENT);

	const { filteredDiscs, view, selectedBag } = useDiscContext();
	const { isSignedIn, isLoaded } = useAuth();

	useEffect(() => {
		const discGrid = document.getElementById("disc-grid");
		const renderMoreDiscsIfAtBottom = () => {
			if (!discGrid) return;
			const scrollDiff =
				discGrid.offsetTop + discGrid.clientHeight - window.innerHeight - document.documentElement.scrollTop;
			if (scrollDiff <= 1 && numDiscsToRender < filteredDiscs.length) renderMoreDiscs();
		};
		window.addEventListener("scroll", renderMoreDiscsIfAtBottom);
		return () => window.removeEventListener("scroll", renderMoreDiscsIfAtBottom);
	}, [filteredDiscs.length, numDiscsToRender]);

	useEffect(() => setNumDiscsToRender(SCROLL_INCREMENT), [filteredDiscs]);

	const renderMoreDiscs = () => setNumDiscsToRender(current => current + SCROLL_INCREMENT);

	const discsToRender = filteredDiscs.slice(0, numDiscsToRender);

	if (view === View.BAGS) {
		if (!isLoaded) return null;
		if (!isSignedIn) {
			return (
				<div className="disc-grid-bag">
					Please <Link href="/sign-in">sign in</Link> to add discs to a bag
				</div>
			);
		} else if (!selectedBag) {
			return <div className="disc-grid-bag">No bags added yet</div>;
		}
	}

	return (
		<div id="disc-grid">
			{discsToRender.map(disc => (
				<Disc key={disc.id} disc={disc} />
			))}
		</div>
	);
};
