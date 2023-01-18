import React from "react";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";

import { IDisc } from "../types/abstract";

interface IAddRemoveButtonProps {
	addDiscToActiveBag: (disc: IDisc) => Promise<void>;
	removeDiscFromActiveBag: (disc: IDisc) => Promise<void>;
	isDiscInActiveBag: (disc: IDisc) => boolean;
	disc: IDisc;
}

export const AddRemoveButton = ({ addDiscToActiveBag, removeDiscFromActiveBag, isDiscInActiveBag, disc }: IAddRemoveButtonProps) => {
	const inBag = isDiscInActiveBag(disc);

	return (
		<IconButton
			className="add-remove-btn"
			aria-label={inBag ? "Remove" : "Add"}
			onClick={async () => {
				if (inBag) await removeDiscFromActiveBag(disc);
				else await addDiscToActiveBag(disc);
			}}
			size="large"
		>
			{inBag ? <RemoveIcon /> : <AddIcon />}
		</IconButton>
	);
};
