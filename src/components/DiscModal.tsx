"use client";

import { useRouter } from "next/navigation";

import { useKeyPress } from "@hooks";
import { Modal as MuiModal } from "@mui/material";

import type { ModalProps } from "@types";

export function DiscModal({ children }: ModalProps) {
	const router = useRouter();

	const onClose = () => {
		router.back();
	};

	useKeyPress("Escape", onClose);

	return (
		<MuiModal open={true} disableEscapeKeyDown>
			<div className="modal" onClick={onClose}>
				{children}
			</div>
		</MuiModal>
	);
}
