import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

import { AlertColor } from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { useLogin } from "../hooks/useLogin";
import { IUser } from "../types/abstract";

interface IRegisterFormProps {
	closeDialog: () => void;
	setLoggedInUser: (user: IUser | undefined) => void;
	showNotification: (severity: AlertColor, message: string) => void;
}

export const RegisterForm = ({ closeDialog, setLoggedInUser, showNotification }: IRegisterFormProps) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		if (username.length > 16) setUsername(username.substring(0, 16));
	}, [username]);

	const { register } = useLogin(setLoggedInUser, showNotification);

	return (
		<form>
			<div className="login-dialog-item">
				<TextField
					value={username}
					label="username"
					variant="outlined"
					onChange={(e) => {
						setUsername(e.target.value);
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
					value={email}
					label="email"
					variant="outlined"
					type="email"
					onChange={(e) => {
						setEmail(e.target.value);
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
			<div className="login-dialog-item">
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
			{error && <div className="login-dialog-item login-dialog-error">{error}</div>}
			<div className="login-dialog-item">
				<Button
					variant="outlined"
					type="submit"
					onClick={async (e) => {
						try {
							e.preventDefault();
							await register(username, email, password);
							closeDialog();
						} catch (error) {
							setError(error as string);
						}
					}}
				>
					Register
				</Button>
			</div>
		</form>
	);
};
