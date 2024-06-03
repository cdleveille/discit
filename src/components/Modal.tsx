"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useKeyPress } from "@hooks";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Modal as MuiModal, Zoom } from "@mui/material";

import type { ModalProps } from "@types";

export function Modal({ children, borderRadius, showCloseBtn }: ModalProps) {
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
		<MuiModal open={open} disableEscapeKeyDown onMouseDown={onClose}>
			<Zoom in={open}>
				<div className="modal" onMouseDown={onClose}>
					<div onMouseDown={e => e.stopPropagation()} style={{ borderRadius, position: "relative" }}>
						{showCloseBtn && (
							<div style={{ position: "absolute", top: "0.75rem", right: "0.75rem", zIndex: 1 }}>
								<IconButton aria-label="close" onClick={onClose}>
									<CloseIcon fontSize="large" />
								</IconButton>
							</div>
						)}
						{children}
					</div>
				</div>
			</Zoom>
		</MuiModal>
	);
}
