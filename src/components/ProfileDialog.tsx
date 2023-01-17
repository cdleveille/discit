import React from "react";

import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import { IUser } from "../types/abstract";
import { CloseButton } from "./CloseButton";

interface IProfileDialogProps {
	open: boolean;
	onClose: () => void;
	loggedInUser: IUser | undefined;
	setShowDeleteAccountDialog: (show: boolean) => void;
}

export const ProfileDialog = ({ open, onClose, loggedInUser, setShowDeleteAccountDialog }: IProfileDialogProps) => {
	return loggedInUser ? (
		<Dialog open={open} onClose={onClose}>
			<div className="profile-dialog">
				<CloseButton onClick={onClose} />
				<div className="dialog-line">
					<div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
						<PersonIcon fontSize="medium" />
						<span>{loggedInUser.username}</span>
					</div>
					<Button className="profile-btn" variant="outlined" onClick={() => console.log("change username")}>
						Change Username
					</Button>
				</div>
				<div className="dialog-line">
					<div>{loggedInUser.email}</div>
					<Button className="profile-btn" variant="outlined" onClick={() => console.log("change email")}>
						Change Email
					</Button>
				</div>
				<div className="dialog-line" style={{ paddingTop: "1.5em" }}>
					<Button className="profile-btn" variant="outlined" onClick={() => console.log("change password")}>
						Change Password
					</Button>
				</div>
				<div className="dialog-line" style={{ paddingTop: "1.5em" }}>
					<Button
						className="profile-btn"
						variant="outlined"
						color="error"
						onClick={() => {
							onClose();
							setShowDeleteAccountDialog(true);
						}}
					>
						Delete Account
					</Button>
				</div>
			</div>
		</Dialog>
	) : (
		<></>
	);
};
