"use client";

import { useEffect, useRef, useState } from "react";

import { useAuth } from "@clerk/nextjs";
import { useApi } from "@hooks";
import ClearIcon from "@mui/icons-material/Clear";
import { Button, IconButton, Stack, TextField } from "@mui/material";

import type { BagFormProps } from "@types";
export const BagForm = ({ title, initialName, submitLabel = "Submit", endIcon, onComplete }: BagFormProps) => {
	const [name, setName] = useState(initialName ?? "");

	const { isLoading, error, setError } = useApi();
	const { userId } = useAuth();

	const inputRef = useRef<HTMLInputElement>();

	useEffect(() => {
		const timeout = setTimeout(() => {
			inputRef?.current?.focus?.();
		}, 100);
		return () => clearTimeout(timeout);
	}, []);

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setError("");
		const name = event.target.value;
		if (name.length > 32) return;
		setName(name);
	};

	return (
		<form
			action={() => {
				if (!userId) return setError("Please sign in to manage bags");
				onComplete({ userId, bagName: name });
			}}
		>
			<Stack className="form" justifyContent="center" alignItems="center" spacing="3rem">
				<div className="form-title">{title}</div>
				<div
					style={{
						width: "100%",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						rowGap: "0.5rem"
					}}
				>
					<div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
						<TextField
							label="name"
							placeholder="name"
							type="text"
							variant="outlined"
							value={name}
							onChange={onChange}
							required
							sx={{ width: "100%", maxWidth: "24rem" }}
							autoFocus
							spellCheck={false}
							inputRef={inputRef}
							InputProps={{
								endAdornment: (
									<IconButton
										sx={{ visibility: name ? "visible" : "hidden" }}
										onClick={() => setName("")}
									>
										<ClearIcon />
									</IconButton>
								)
							}}
						/>
					</div>
					<div className="error" style={{ height: "1.25rem" }}>
						{error}
					</div>
				</div>
				<Button
					size="large"
					variant="contained"
					endIcon={endIcon}
					sx={{ fontSize: "1.25rem", padding: "0.5rem 2rem" }}
					disabled={name.length === 0 || isLoading}
					type="submit"
				>
					{submitLabel}
				</Button>
			</Stack>
		</form>
	);
};
