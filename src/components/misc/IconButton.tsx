import { IconButton as MuiIconButton } from "@mui/material";

import type { IconButtonProps as MuiIconButtonProps } from "@mui/material";

import type { IconButtonProps } from "@types";

export const IconButton = ({
	children,
	isTransparent,
	isSolid,
	isSelected,
	className,
	...props
}: IconButtonProps & MuiIconButtonProps) => {
	const transparent = isTransparent ? "icon-btn-transparent" : "";
	const solid = isSolid ? "icon-btn-solid" : "";
	const selected = isSelected ? "icon-btn-selected" : "";
	return (
		<div className={`icon-btn ${className} ${transparent} ${solid} ${selected}`}>
			<MuiIconButton {...props}>{children}</MuiIconButton>
		</div>
	);
};
