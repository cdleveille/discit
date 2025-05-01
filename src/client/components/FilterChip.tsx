import { Chip } from "@mui/material";

export const FilterChip = ({
	label,
	isSelected,
	onClick
}: {
	label: string;
	isSelected: boolean;
	onClick: () => void;
}) => {
	return (
		<Chip
			className="filter-chip"
			variant="filled"
			label={label}
			onClick={onClick}
			sx={{
				backgroundColor: isSelected ? "#bebebe !important" : "#ebebeb",
				outline: isSelected ? "2px solid #757575" : "none"
			}}
		/>
	);
};
