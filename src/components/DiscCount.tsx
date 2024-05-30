"use-client";

import { useContext } from "react";

import { DiscContext } from "@components";

export const DiscCount = () => {
	const {
		filteredDiscs: { length },
		setFilteredDiscs
	} = useContext(DiscContext);
	return (
		<div className="disc-count" onClick={() => setFilteredDiscs(current => [...current.reverse()])}>
			{length}&nbsp;disc{length === 1 ? "" : "s"}
		</div>
	);
};
