import { useAuth } from "@clerk/clerk-react";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { Button, CircularProgress, IconButton, Stack, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import { useApi, useAppContext } from "@hooks";
import type { TReactStateSetter } from "@types";

export const BagAdd = ({ onClose }: { onClose: () => void }) => {
	const [name, setName] = useState("");

	const { userId } = useAuth();
	const { addBag } = useApi();
	const { setSelectedBagId } = useAppContext();

	if (!userId) return null;

	const { mutate, isSuccess, isError, isPending, error, data } = addBag(userId, name);

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const name = event.target.value;
		if (name.length > 32) return;
		setName(name);
	};

	const onSubmit = () => mutate();

	useEffect(() => {
		if (isPending) return;
		if (isError) {
			toast.error(error.message ?? "Error adding bag");
			return console.error(error);
		}
		if (isSuccess) {
			toast.success(`Added ${data.name}`);
			setSelectedBagId(data.id);
			onClose();
		}
	}, [isPending, isSuccess, isError, error, onClose, data, setSelectedBagId]);

	return (
		<form action={onSubmit}>
			<BagAddForm name={name} setName={setName} onChange={onChange} isPending={isPending} />
		</form>
	);
};

export const BagAddForm = ({
	name,
	setName,
	onChange,
	isPending
}: {
	name: string;
	setName: TReactStateSetter<string>;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	isPending: boolean;
}) => {
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const timeout = setTimeout(() => {
			inputRef?.current?.focus?.();
		}, 100);
		return () => clearTimeout(timeout);
	}, []);

	const isDisabled = name.length === 0 || isPending;

	return (
		<Stack className="form" justifyContent="center" alignItems="center" spacing="3rem">
			<div className="form-title">New Bag</div>
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
				endIcon={isPending ? <CircularProgress size="22px" /> : <AddIcon />}
				sx={{ fontSize: "1.25rem", padding: "0.5rem 2rem" }}
				disabled={isDisabled}
				type="submit"
			>
				Add
			</Button>
		</Stack>
	);
};
