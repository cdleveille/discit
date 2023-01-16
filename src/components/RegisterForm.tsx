import React, { useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { useLogin } from "../hooks/useLogin";
import { IUser } from "../types/abstract";

interface IRegisterFormProps {
	closeDialog: () => void;
	setLoggedInUser: (user: IUser | undefined) => void;
}

export const RegisterForm = ({ closeDialog, setLoggedInUser }: IRegisterFormProps) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const { register } = useLogin(setLoggedInUser);

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
					label="email"
					variant="outlined"
					type="email"
					onChange={(e) => {
						setEmail(e.target.value);
					}}
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
