import React, { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";

import { IUser } from "../types/abstract";
import { CloseButton } from "./CloseButton";

interface IDeleteAccountDialogProps {
	open: boolean;
	onClose: () => void;
	loggedInUser: IUser | undefined;
	deleteAccount: (password: string) => Promise<void>;
}

export const DeleteAccountDialog = ({ open, onClose, loggedInUser, deleteAccount }: IDeleteAccountDialogProps) => {
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const resetForm = () => {
		setPassword("");
		setError("");
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<div className="delete-account-dialog">
				<CloseButton onClick={onClose} />
				<form>
					<div className="login-dialog-item" style={{ paddingBottom: "1.5em" }}>
						<TextField
							value={password}
							label="password"
							variant="outlined"
							type="password"
							onChange={(e) => {
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
					{error && (
						<div className="login-dialog-error" style={{ paddingBottom: "2em" }}>
							{error}
						</div>
					)}
					<Button
						variant="outlined"
						type="submit"
						color="error"
						onClick={async (e) => {
							try {
								e.preventDefault();
								loggedInUser && (await deleteAccount(password));
								resetForm();
								onClose();
							} catch (error) {
								setError(error as string);
							}
						}}
						style={{ marginLeft: "1em", marginRight: "1em", marginBottom: "1em" }}
					>
						Delete Account
					</Button>
					<Button variant="outlined" onClick={onClose} style={{ marginLeft: "1em", marginRight: "1em", marginBottom: "1em" }}>
						Cancel
					</Button>
				</form>
			</div>
		</Dialog>
	);
};
