import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

interface ICloseButtonProps {
	onClick: () => void;
}

export const CloseButton = ({ onClick }: ICloseButtonProps) => {
	return (
		<div className="close-btn">
			<IconButton aria-label="Close" onClick={onClick} size="large">
				<CloseIcon />
			</IconButton>
		</div>
	);
};
