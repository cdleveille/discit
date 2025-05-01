import { useAuth } from "@clerk/clerk-react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, CircularProgress, Stack } from "@mui/material";
import { useEffect } from "react";
import toast from "react-hot-toast";

import { useApi } from "@hooks";
import type { TBag } from "@types";

export const BagDelete = ({ bag, onClose }: { bag: TBag; onClose: () => void }) => {
	const { userId } = useAuth();
	const { deleteBag } = useApi();

	if (!userId) return null;

	const { mutate, isSuccess, isError, isPending, error, data } = deleteBag(bag.id, userId);

	const onSubmit = () => mutate();

	useEffect(() => {
		if (isPending) return;
		if (isError) {
			toast.error(error.message ?? "Error deleting bag");
			return console.error(error);
		}
		if (isSuccess) {
			toast.success(`Deleted ${data.name}`);
			onClose();
		}
	}, [isPending, isSuccess, isError, error, onClose, data]);

	return (
		<form action={onSubmit}>
			<BagDeleteForm name={bag.name} isPending={isPending} />
		</form>
	);
};

const BagDeleteForm = ({ name, isPending }: { name: string; isPending: boolean }) => {
	return (
		<Stack className="form" justifyContent="center" alignItems="center" spacing="3rem">
			<div className="form-title">Delete Bag</div>
			<Stack spacing="0.5rem" alignItems="center">
				<div style={{ fontSize: "1.25rem" }}>Are you sure you want to delete {name}?</div>
			</Stack>
			<Button
				size="large"
				variant="contained"
				endIcon={isPending ? <CircularProgress size="22px" /> : <DeleteIcon />}
				sx={{ fontSize: "1.25rem", padding: "0.5rem 2rem" }}
				color="error"
				disabled={isPending}
				type="submit"
			>
				Delete
			</Button>
		</Stack>
	);
};
