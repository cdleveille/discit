import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Modal as MuiModal, Zoom } from "@mui/material";
import { useEffect, useState } from "react";

import type { TModalProps } from "@types";

export const Modal = ({ children, isOpen, onClose, showCloseBtn }: TModalProps) => {
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
		<MuiModal open={isOpen} onClose={onRequestClose}>
			<div className="absolute-centered" style={{ borderRadius: "50%", outline: "none" }}>
				<Zoom in={isZoomed}>
					<div style={{ position: "relative", borderRadius: "50%" }}>
						{showCloseBtn && (
							<IconButton
								className="icon-btn"
								aria-label="Close"
								onClick={onRequestClose}
								sx={{ width: "3rem", height: "3rem" }}
								style={{
									position: "absolute",
									top: "0.75rem",
									right: "0.75rem",
									zIndex: 1000
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
