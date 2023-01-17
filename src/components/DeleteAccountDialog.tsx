import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import { IUser } from "../types/abstract";
import { CloseButton } from "./CloseButton";

interface IDeleteAccountDialogProps {
	open: boolean;
	onClose: () => void;
	loggedInUser: IUser | undefined;
	deleteAccount: (id: string) => void;
}

export const DeleteAccountDialog = ({ open, onClose, loggedInUser, deleteAccount }: IDeleteAccountDialogProps) => {
	return (
		<Dialog open={open} onClose={onClose}>
			<div className="delete-account-dialog">
				<CloseButton onClick={onClose} />
				<div className="dialog-line">Are you sure you want to delete your account?</div>
				<Button
					variant="outlined"
					color="error"
					onClick={() => {
						loggedInUser && deleteAccount(loggedInUser?.id);
						onClose();
					}}
					style={{ marginLeft: "1em", marginRight: "1em", marginBottom: "1em" }}
				>
					Delete
				</Button>
				<Button variant="outlined" onClick={onClose} style={{ marginLeft: "1em", marginRight: "1em", marginBottom: "1em" }}>
					Cancel
				</Button>
			</div>
		</Dialog>
	);
};
