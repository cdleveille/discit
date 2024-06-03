"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useKeyPress } from "@hooks";
import { Modal as MuiModal, Zoom } from "@mui/material";

import type { ModalProps } from "@types";

export function Modal({ children }: ModalProps) {
	const [open, setOpen] = useState(true);

	const router = useRouter();
	const onClose = () => setOpen(false);
	useKeyPress("Escape", onClose);

	useEffect(() => {
		if (open) return;
		const timeout = setTimeout(() => router.back(), 200);
		return () => clearTimeout(timeout);
	}, [open, router]);

	return (
		<MuiModal open={open} disableEscapeKeyDown>
			<Zoom in={open}>
				<div className="modal" onMouseDown={onClose}>
					<div onMouseDown={e => e.stopPropagation()}>{children}</div>
				</div>
			</Zoom>
		</MuiModal>
	);
}
