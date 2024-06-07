import { useKeyPress } from "@hooks";
import { IconButton as MuiIconButton } from "@mui/material";

import type { IconButtonProps as MuiIconButtonProps } from "@mui/material";

import type { IconButtonProps } from "@types";

export const IconButton = ({
	children,
	isTransparent,
	isSolid,
	isSelected,
	className,
	style,
	onKey,
	...props
}: IconButtonProps & MuiIconButtonProps) => {
	useKeyPress(onKey?.keyCode, onKey?.action);

	const transparent = isTransparent ? "icon-btn-transparent" : "";
	const solid = isSolid ? "icon-btn-solid" : "";
	const selected = isSelected ? "icon-btn-selected" : "";

	return (
		<div
			className={`icon-btn ${className} ${transparent} ${solid} ${selected}`}
			style={style}
			onClick={e => e.stopPropagation()}
		>
			<MuiIconButton {...props}>{children}</MuiIconButton>
		</div>
	);
};
