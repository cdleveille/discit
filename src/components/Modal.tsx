"use client";

import { useRouter } from "next/navigation";

import { Modal as MuiModal } from "@mui/material";

import type { ModalProps } from "@types";

export function Modal({ children }: ModalProps) {
	const router = useRouter();
	const onClose = () => router.back();
	return (
		<MuiModal open={true}>
			<div className="modal" onClick={onClose}>
				{children}
			</div>
		</MuiModal>
	);
}
