import React, { useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { useLogin } from "../hooks/useLogin";
import { IUser } from "../types/abstract";

interface ILoginFormProps {
	closeDialog: () => void;
	setLoggedInUser: (user: IUser | undefined) => void;
}

export const LoginForm = ({ closeDialog, setLoggedInUser }: ILoginFormProps) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const { logIn } = useLogin(setLoggedInUser);

	return (
		<form>
			<div className="login-dialog-item">
				<TextField
					label="username"
					variant="outlined"
					onChange={(e) => {
						setUsername(e.target.value);
					}}
					autoFocus
				/>
			</div>
			<div className="login-dialog-item">
				<TextField
					label="password"
					variant="outlined"
					type="password"
					onChange={(e) => {
						setPassword(e.target.value);
					}}
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
							await logIn(username, password);
							closeDialog();
						} catch (error) {
							setError(error as string);
						}
					}}
				>
					Log In
				</Button>
			</div>
		</form>
	);
};
