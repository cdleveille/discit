"use client";

import { useRouter } from "next/navigation";

import { Modal as MuiModal } from "@mui/material";

import type { ModalProps } from "@types";

export function DiscModal({ children }: ModalProps) {
	const router = useRouter();
	const onClose = () => router.back();
	return (
		<MuiModal open={true} className="mui-fixed">
			<div className="modal" onClick={onClose}>
				{children}
			</div>
		</MuiModal>
	);
}
