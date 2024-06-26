"use client";

import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";

import { useAuth } from "@clerk/nextjs";
import { useApi } from "@hooks";
import ClearIcon from "@mui/icons-material/Clear";
import SaveIcon from "@mui/icons-material/Save";
import { Button, IconButton, Stack, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import type { BagEditFormProps, BagEditProps } from "@types";

export const BagEdit = ({ bag, onClose }: BagEditProps) => {
	const [name, setName] = useState(bag.name);

	const { userId } = useAuth();
	const { error, setError, editBagName } = useApi();

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setError("");
		const name = event.target.value;
		if (name.length > 32) return;
		setName(name);
	};

	const onSubmit = async () => {
		if (!userId) return setError("Please sign in to manage bags");
		const res = await editBagName({ bagId: bag.id, bagName: name });
		if (res.error) return;
		onClose();
		toast.success(`Renamed to ${res.name}`);
	};

	return (
		<form action={onSubmit}>
			<BagEditForm name={name} setName={setName} onChange={onChange} error={error} initialBagName={bag.name} />
		</form>
	);
};

export const BagEditForm = ({ name, setName, onChange, error, initialBagName }: BagEditFormProps) => {
	const { pending } = useFormStatus();

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const timeout = setTimeout(() => {
			inputRef?.current?.focus?.();
		}, 100);
		return () => clearTimeout(timeout);
	}, []);

	const disabled = name.length === 0 || name === initialBagName || pending;

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
				endIcon={pending ? <CircularProgress size="22px" /> : <SaveIcon />}
				sx={{ fontSize: "1.25rem", padding: "0.5rem 2rem" }}
				disabled={disabled}
				type="submit"
			>
				Save
			</Button>
		</Stack>
	);
};
