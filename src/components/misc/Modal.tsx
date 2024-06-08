"use client";

import { useEffect, useState } from "react";

import { IconButton } from "@components";
import CloseIcon from "@mui/icons-material/Close";
import { Modal as MuiModal, Zoom } from "@mui/material";

import type { ModalProps } from "@types";

export const Modal = ({ children, open, onClose, showCloseBtn }: ModalProps) => {
	const [isZoomed, setIsZoomed] = useState(true);

	useEffect(() => {
		if (isZoomed) return;
		const timeout = setTimeout(() => {
			onClose();
			setIsZoomed(true);
		}, 150);
		return () => clearTimeout(timeout);
	}, [onClose, isZoomed]);

	const onRequestClose = () => setIsZoomed(false);

	return (
		<MuiModal open={open} onClose={onRequestClose} disableScrollLock>
			<div className="absolute-centered" style={{ borderRadius: "50%", outline: "none" }}>
				<Zoom in={isZoomed}>
					<div style={{ position: "relative", borderRadius: "50%" }}>
						{showCloseBtn && (
							<IconButton
								aria-label="close"
								onClick={onRequestClose}
								style={{ position: "absolute", top: "0.75rem", right: "0.75rem", zIndex: 1000 }}
								isTransparent
							>
								<CloseIcon fontSize="large" />
							</IconButton>
						)}
						{children}
					</div>
				</Zoom>
			</div>
		</MuiModal>
	);
};
