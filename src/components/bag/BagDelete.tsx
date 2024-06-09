"use client";

import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";

import { useApi } from "@hooks";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, CircularProgress, Stack } from "@mui/material";

import type { BagDeleteProps, BagDeleteFormProps } from "@types";
export const BagDelete = ({ bag, onClose }: BagDeleteProps) => {
	const { error, deleteBag } = useApi();

	const onSubmit = async () => {
		const res = await deleteBag({ bagId: bag.id });
		if (res.error) return;
		onClose();
		toast.success(`Deleted ${bag.name}`);
	};

	return (
		<form action={onSubmit}>
			<BagDeleteForm name={bag.name} error={error} />
		</form>
	);
};

const BagDeleteForm = ({ name, error }: BagDeleteFormProps) => {
	const { pending } = useFormStatus();

	return (
		<Stack className="form" justifyContent="center" alignItems="center" spacing="3rem">
			<div className="form-title">Delete Bag</div>
			<Stack spacing="0.5rem" alignItems="center">
				<div style={{ fontSize: "1.25rem", fontWeight: 500, color: "#757575" }}>
					Are you sure you want to delete {name}?
				</div>
				<div className="error" style={{ height: "1.25rem" }}>
					{error}
				</div>
			</Stack>
			<Button
				size="large"
				variant="contained"
				endIcon={pending ? <CircularProgress size="22px" /> : <DeleteIcon />}
				sx={{ fontSize: "1.25rem", padding: "0.5rem 2rem" }}
				color="error"
				disabled={pending}
				type="submit"
			>
				Delete
			</Button>
		</Stack>
	);
};
