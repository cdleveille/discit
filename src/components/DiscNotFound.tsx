"use client";

import { useParams } from "next/navigation";

import { useAppContext } from "@hooks";

export const DiscNotFound = () => {
	const { name_slug } = useParams();
	const { discs } = useAppContext();
	if (!name_slug || discs.find(disc => disc.name_slug === name_slug)) return null;
	return (
		<div className="disc-detail-container">
			<div className="disc-detail-not-found">
				<div>Disc not found!</div>
			</div>
		</div>
	);
};
