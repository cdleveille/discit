import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Stack } from "@mui/material";

import type { BagDeleteProps } from "@types";

export const BagDelete = ({ bag, onSubmit }: BagDeleteProps) => {
	return (
		<Stack className="form" justifyContent="center" alignItems="center" spacing="3rem">
			<div className="form-title">Delete Bag</div>
			<div style={{ fontSize: "1.25rem", fontWeight: 500, color: "#757575", marginBottom: "0.5rem" }}>
				Are you sure you want to delete {bag.name}?
			</div>
			<Button
				size="large"
				variant="contained"
				endIcon={<DeleteIcon />}
				sx={{ fontSize: "1.25rem", padding: "0.5rem 2rem" }}
				color="error"
				onClick={onSubmit}
			>
				Delete
			</Button>
		</Stack>
	);
};
