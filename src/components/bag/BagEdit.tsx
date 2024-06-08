"use client";

import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "@clerk/nextjs";
import { useApi } from "@hooks";
import ClearIcon from "@mui/icons-material/Clear";
import SaveIcon from "@mui/icons-material/Save";
import { Button, IconButton, Stack, TextField } from "@mui/material";

import type { BagEditProps } from "@types";

export const BagEdit = ({ bag, onClose }: BagEditProps) => {
	const [name, setName] = useState(bag.name);

	const { isLoading, error, setError, editBagName } = useApi();
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
		<Stack className="form" justifyContent="center" alignItems="center" spacing="3rem">
			<div className="form-title">Edit Bag</div>
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
				endIcon={<SaveIcon />}
				sx={{ fontSize: "1.25rem", padding: "0.5rem 2rem" }}
				disabled={name.length === 0 || isLoading}
				type="submit"
				onClick={async () => {
					const currentName = bag.name;
					if (!userId) return setError("Please sign in to manage bags");
					const res = await editBagName({ bagId: bag.id, bagName: name });
					if (res.error) return;
					onClose();
					if (currentName !== res.name) toast.success(`Renamed to ${res.name}`);
				}}
			>
				Save
			</Button>
		</Stack>
	);
};
