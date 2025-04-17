import { CircularProgress } from "@mui/material";

export const Loader = () => {
	return (
		<div className="loader">
			<CircularProgress size={150} />
		</div>
	);
};
