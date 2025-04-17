import { CircularProgress } from "@mui/material";

export const Loader = ({ size, className }: { size?: string | number; className?: string }) => {
	return (
		<div className={className}>
			<CircularProgress size={size} />
		</div>
	);
};
