import { useAuth } from "@clerk/clerk-react";
import ClearIcon from "@mui/icons-material/Clear";
import SaveIcon from "@mui/icons-material/Save";
import { Button, CircularProgress, IconButton, Stack, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import { useApi } from "@hooks";
import type { TBag, TReactStateSetter } from "@types";

export const BagEdit = ({ bag, onClose }: { bag: TBag; onClose: () => void }) => {
	const [name, setName] = useState(bag.name);
	const { userId } = useAuth();
	const { editBag } = useApi();

	if (!userId) return null;

	const { mutate, isSuccess, isError, isPending, error, data } = editBag(bag.id, name, userId);

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const name = event.target.value;
		if (name.length > 32) return;
		setName(name);
	};

	const onSubmit = () => mutate();

	useEffect(() => {
		if (isPending) return;
		if (isError) {
			toast.error(error.message ?? "Error editing bag");
			return console.error(error);
		}
		if (isSuccess) {
			toast.success(`Renamed to ${data.name}`);
			onClose();
		}
	}, [isPending, isSuccess, isError, error, onClose, data]);

	return (
		<form action={onSubmit}>
			<BagEditForm
				name={name}
				setName={setName}
				onChange={onChange}
				initialBagName={bag.name}
				isPending={isPending}
			/>
		</form>
	);
};

export const BagEditForm = ({
	name,
	setName,
	onChange,
	initialBagName,
	isPending
}: {
	name: string;
	setName: TReactStateSetter<string>;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	initialBagName: string;
	isPending: boolean;
}) => {
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const timeout = setTimeout(() => {
			inputRef?.current?.focus?.();
		}, 100);
		return () => clearTimeout(timeout);
	}, []);

	const disabled = name.length === 0 || name === initialBagName || isPending;

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
			</div>
			<Button
				size="large"
				variant="contained"
				endIcon={isPending ? <CircularProgress size="22px" /> : <SaveIcon />}
				sx={{ fontSize: "1.25rem", padding: "0.5rem 2rem" }}
				disabled={disabled}
				type="submit"
			>
				Save
			</Button>
		</Stack>
	);
};
