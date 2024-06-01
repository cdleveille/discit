"use-client";

import { useDiscContext } from "@hooks";

export const DiscCount = () => {
	const {
		filteredDiscs: { length },
		setFilteredDiscs
	} = useDiscContext();
	return (
		<div className="disc-count" onClick={() => setFilteredDiscs(current => [...current.reverse()])}>
			{length}&nbsp;disc{length === 1 ? "" : "s"}
		</div>
	);
};
