"use client";

import type { TDisc } from "@/types";

import Link from "next/link";

export const DiscCard = ({ disc }: { disc: TDisc }) => {
	return (
		<div className="disc-card-container">
			<Link
				href={`?disc=${disc.name_slug}`}
				className="disc-card"
				style={{
					color: disc.color,
					background: getDiscGradientBackground(disc.background_color)
				}}
				scroll={false}
			>
				<div className="disc-card-name">{disc.name}</div>
			</Link>
		</div>
	);
};

const getDiscGradientBackground = (backgroundColor = "#555555") => {
	const innerGradient = backgroundColor === "#000000" ? "#333333" : backgroundColor;
	const outerGradient = backgroundColor === "#000000" ? "#000000" : "#222222";
	return `radial-gradient(circle, ${innerGradient} 50%, ${outerGradient} 100%)`;
};
