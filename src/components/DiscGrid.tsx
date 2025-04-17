"use client";

import { useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";

import { DiscCard } from "@/components/DiscCard";
import { SCROLL_INCREMENT } from "@/constants";
import type { TDisc } from "@/types";

export const DiscGrid = ({ discs }: { discs: TDisc[] }) => {
	const [numDiscsToRender, setNumDiscsToRender] = useState(SCROLL_INCREMENT);

	// todo: apply filters here
	const filteredDiscs = discs;

	const hasMoreDiscsToRender = numDiscsToRender < filteredDiscs.length;

	const discsToRender = filteredDiscs.slice(0, numDiscsToRender);

	const [sentryRef] = useInfiniteScroll({
		loading: false,
		hasNextPage: hasMoreDiscsToRender,
		disabled: !hasMoreDiscsToRender,
		onLoadMore: () => setNumDiscsToRender(current => current + SCROLL_INCREMENT),
		rootMargin: "0px 0px 16px 0px",
		delayInMs: 10
	});

	return (
		<div className="disc-grid">
			{discsToRender.map(disc => {
				return <DiscCard key={disc.id} disc={disc} />;
			})}
			{hasMoreDiscsToRender && <div ref={sentryRef} />}
		</div>
	);
};
