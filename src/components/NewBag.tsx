"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "@clerk/nextjs";
import { useApi } from "@hooks";
import AddIcon from "@mui/icons-material/Add";
import { Button, Stack, TextField } from "@mui/material";

import type { NewBagProps } from "@types";

export const NewBag = ({ onComplete }: NewBagProps) => {
	const [name, setName] = useState("");

	const { isLoading, createBag, error, setError } = useApi();

	const { isSignedIn, userId } = useAuth();

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

	if (!isSignedIn)
		return (
			<div className="disc-grid-bag">
				Please <Link href={`/sign-in?redirect=${encodeURI("/bag/new")}`}>sign in</Link> to add a new bag
			</div>
		);

	return (
		<form
			action={async () => {
				const res = await createBag({ userId, bagName: name });
				if (res.error) return;
				onComplete();
				toast.success(`Added ${name}`);
			}}
		>
			<Stack className="add-bag" justifyContent="center" alignItems="center" spacing="3rem">
				<div className="add-bag-title">New Bag</div>
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
							name="add-bag-name"
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
						/>
					</div>
					<div className="error" style={{ height: "1.25rem" }}>
						{error}
					</div>
				</div>
				<Button
					size="large"
					variant="contained"
					endIcon={<AddIcon />}
					sx={{ fontSize: "1.25rem", padding: "0.5rem 2rem" }}
					disabled={name.length === 0 || isLoading}
					type="submit"
				>
					Add
				</Button>
			</Stack>
		</form>
	);
};
