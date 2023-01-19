import React, { useState } from "react";
import { isMobile } from "react-device-detect";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";

import { CloseButton } from "./CloseButton";

interface IChangePasswordDialogProps {
	open: boolean;
	onClose: () => void;
	changePassword: (newPassword: string, password: string) => Promise<void>;
}

export const ChangePasswordDialog = ({ open, onClose, changePassword }: IChangePasswordDialogProps) => {
	const [newPassword, setNewPassword] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const resetForm = () => {
		setNewPassword("");
		setPassword("");
		setError("");
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<div className="change-username-dialog">
				<CloseButton onClick={onClose} />
				<form>
					<div className="change-username-dialog-item">
						<TextField
							value={newPassword}
							label="new password"
							variant="outlined"
							type="password"
							onChange={e => {
								setNewPassword(e.target.value);
							}}
							autoFocus={!isMobile}
							spellCheck={false}
							inputProps={{
								autoCapitalize: "none",
								autoComplete: "none"
							}}
							autoCapitalize="none"
							autoComplete="none"
						/>
					</div>
					<div className="login-dialog-item">
						<TextField
							value={password}
							label="current password"
							variant="outlined"
							type="password"
							onChange={e => {
								setPassword(e.target.value);
							}}
							spellCheck={false}
							inputProps={{
								autoCapitalize: "none",
								autoComplete: "none"
							}}
							autoCapitalize="none"
							autoComplete="none"
						/>
					</div>
					{error && <div className="change-username-dialog-item change-username-dialog-error">{error}</div>}
					<div className="change-username-dialog-item">
						<Button
							variant="outlined"
							color="error"
							type="submit"
							onClick={async e => {
								try {
									e.preventDefault();
									await changePassword(newPassword, password);
									resetForm();
									onClose();
								} catch (error) {
									setError(error as string);
								}
							}}
							style={{ marginLeft: "1em", marginRight: "1em", marginBottom: "1em" }}
						>
							Change Password
						</Button>
						<Button
							variant="outlined"
							onClick={onClose}
							style={{ marginLeft: "1em", marginRight: "1em", marginBottom: "1em" }}
						>
							Cancel
						</Button>
					</div>
				</form>
			</div>
		</Dialog>
	);
};
