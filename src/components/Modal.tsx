"use client";

import { useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Modal as MuiModal, Zoom } from "@mui/material";

export const Modal = ({
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
		<MuiModal open={isOpen} onClose={onRequestClose} disableScrollLock>
			<div className="centered" style={{ borderRadius: "50%", outline: "none" }}>
				<Zoom in={isZoomed}>
					<div style={{ position: "relative", borderRadius: "50%" }}>
						{isCloseBtnVisible && (
							<IconButton
								aria-label="Close"
								onClick={onClose}
								style={{
									position: "absolute",
									top: "0.75rem",
									right: "0.75rem",
									zIndex: 1000,
									backgroundColor: "rgba(221, 221, 221, 0)"
								}}
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
