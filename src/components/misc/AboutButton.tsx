"use client";

import { IconButton } from "@components";
import { useAppContext } from "@hooks";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export const AboutButton = () => {
	const { showAboutModal } = useAppContext();
	return (
		<IconButton aria-label="about" onClick={showAboutModal}>
			<InfoOutlinedIcon sx={{ fontSize: "2rem" }} />
		</IconButton>
	);
};
