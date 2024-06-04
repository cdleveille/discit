"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { createBag } from "@actions";
import { useAuth } from "@clerk/nextjs";
import AddIcon from "@mui/icons-material/Add";
import { Button, Stack, TextField } from "@mui/material";

import type { Bag, NewBagProps } from "@types";

export const NewBag = ({ backOnSubmit }: NewBagProps) => {
	const [name, setName] = useState("");
	const [error, setError] = useState("");

	const { isSignedIn, userId } = useAuth();

	const router = useRouter();

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
				try {
					const action = createBag.bind(null, { userId, bagName: name });
					const res = (await action()) as Bag & { error?: string };
					if (res.error) throw res.error;
					setName("");
					setError("");
					if (backOnSubmit) router.back();
				} catch (error) {
					setError(error as string);
				}
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
					disabled={name.length === 0}
					type="submit"
				>
					Add
				</Button>
			</Stack>
		</form>
	);
};
