"use client";

import { Tooltip } from "@/components/Tooltip";
import { InfoOutline } from "@mui/icons-material";
import { IconButton as MuiIconButton } from "@mui/material";

export const AboutButton = () => {
	return (
		<Tooltip title="About">
			<MuiIconButton
				aria-label="About"
				onClick={() => console.log("show about modal")}
				sx={{ width: "3rem", height: "3rem" }}
			>
				<InfoOutline sx={{ fontSize: "58px" }} />
			</MuiIconButton>
		</Tooltip>
	);
};
