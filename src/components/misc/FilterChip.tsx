import { Chip } from "@mui/material";

import type { FilterChipProps } from "@types";

export const FilterChip = ({ label, isSelected, onClick }: FilterChipProps) => {
	return (
		<Chip
			className="filter-chip"
			variant="filled"
			label={label}
			onClick={onClick}
			sx={{ backgroundColor: isSelected ? "#bebebe !important" : "#ebebeb" }}
		/>
	);
};
