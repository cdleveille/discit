import { Tooltip } from "@components";
import { useAppContext } from "@hooks";

export const DiscCount = () => {
	const {
		filteredDiscs: { length },
		isSortAZ,
		toggleSortOrder
	} = useAppContext();

	return (
		<Tooltip title={isSortAZ ? "A → Z" : "Z → A"}>
			<button type="button" onClick={toggleSortOrder} className="disc-count">
				{length}&nbsp;disc{length === 1 ? "" : "s"}
			</button>
		</Tooltip>
	);
};
