"use-client";

import { useAppContext } from "@hooks";

export const DiscCount = () => {
	const {
		filteredDiscs: { length },
		setDiscs
	} = useAppContext();

	return (
		<div className="disc-count-container">
			<div
				className={`disc-count ${length === 0 ? "disabled" : ""}`}
				onClick={() => setDiscs(discs => [...discs.reverse()])}
			>
				{length}&nbsp;disc{length === 1 ? "" : "s"}
			</div>
		</div>
	);
};
