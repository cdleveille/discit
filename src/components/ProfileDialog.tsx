import React from "react";

import Dialog from "@mui/material/Dialog";

import { IUser } from "../types/abstract";
import { CloseButton } from "./CloseButton";

interface IProfileDialogProps {
	open: boolean;
	onClose: () => void;
	loggedInUser: IUser | undefined;
}

export const ProfileDialog = ({ open, onClose, loggedInUser }: IProfileDialogProps) => {
	return (
		<Dialog open={open} onClose={onClose}>
			<div className="profile-dialog">
				<CloseButton onClick={onClose} />
				<div className="dialog-line">Username: {loggedInUser?.username}</div>
				<div className="dialog-line">Email: {loggedInUser?.email}</div>
			</div>
		</Dialog>
	);
};
