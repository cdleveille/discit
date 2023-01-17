import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

interface ILoginFormProps {
	onClose: () => void;
	logIn: (username: string, password: string) => Promise<void>;
}

export const LoginForm = ({ onClose, logIn }: ILoginFormProps) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		if (username.length > 16) setUsername(username.substring(0, 16));
	}, [username]);

	const resetForm = () => {
		setUsername("");
		setPassword("");
		setError("");
	};

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
							await logIn(username, password);
							resetForm();
							onClose();
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
