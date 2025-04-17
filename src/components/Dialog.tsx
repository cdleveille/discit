"use client";

import { Dialog as MuiDialog } from "@mui/material";

export const Dialog = ({
	isOpen = true,
	onClose,
	isCloseBtnVisible = true,
	children
}: {
	isOpen: boolean;
	onClose: () => void;
	isCloseBtnVisible?: boolean;
	children: React.ReactNode;
}) => {
	return (
		<MuiDialog open={isOpen} onClose={onClose}>
			{children}
		</MuiDialog>
	);
};
