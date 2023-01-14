import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";

interface IMenuButtonProps {
	onClick: () => void;
}

export const MenuButton = ({ onClick }: IMenuButtonProps) => {
	return (
		<div className="menu-btn">
			<IconButton aria-label="Menu" onClick={onClick} size="large">
				<MenuIcon />
			</IconButton>
		</div>
	);
};
