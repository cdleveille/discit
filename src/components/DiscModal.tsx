"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useKeyPress } from "@hooks";
import { Modal as MuiModal } from "@mui/material";

import type { ModalProps } from "@types";

export function DiscModal({ children }: ModalProps) {
	const [open, setOpen] = useState(true);

	const router = useRouter();
	const onClose = () => {
		setOpen(false);
		router.push("/");
	};

	useKeyPress("Escape", onClose);

	return (
		<MuiModal open={open} disableEscapeKeyDown>
			<div className="modal" onClick={onClose}>
				{children}
			</div>
		</MuiModal>
	);
}
