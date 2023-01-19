import React, { useState } from "react";
import { isMobile } from "react-device-detect";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";

import { CloseButton } from "./CloseButton";

interface IChangeUsernameDialogProps {
	open: boolean;
	onClose: () => void;
	changeUsername: (username: string, password: string) => Promise<void>;
}

export const ChangeUsernameDialog = ({ open, onClose, changeUsername }: IChangeUsernameDialogProps) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const resetForm = () => {
		setUsername("");
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
							value={username}
							label="new username"
							variant="outlined"
							onChange={e => {
								if (e.target.value.length <= 16) setUsername(e.target.value);
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
							label="password"
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
									await changeUsername(username, password);
									resetForm();
									onClose();
								} catch (error) {
									setError(error as string);
								}
							}}
							style={{ marginLeft: "1em", marginRight: "1em", marginBottom: "1em" }}
						>
							Change Username
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
