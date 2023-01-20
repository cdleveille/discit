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
	size?: "small" | "medium" | "large";
	className?: string;
}

export const AddRemoveButton = ({
	addDiscToActiveBag,
	removeDiscFromActiveBag,
	isDiscInActiveBag,
	disc,
	size,
	className
}: IAddRemoveButtonProps) => {
	const inBag = isDiscInActiveBag(disc);

	return (
		<div className={className || "add-remove-btn"}>
			<IconButton
				aria-label={inBag ? "Remove" : "Add"}
				onClick={async () => {
					if (inBag) await removeDiscFromActiveBag(disc);
					else await addDiscToActiveBag(disc);
				}}
				size={size || "large"}
			>
				{inBag ? <RemoveIcon /> : <AddIcon />}
			</IconButton>
		</div>
	);
};
