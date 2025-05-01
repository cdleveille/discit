import { InfoOutline } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import { Tooltip } from "@components";
import { useAppContext } from "@hooks";

export const AboutButton = () => {
	const { showAboutModal } = useAppContext();

	return (
		<Tooltip title="About">
			<IconButton
				aria-label="About"
				onClick={showAboutModal}
				sx={{ width: "3rem", height: "3rem", color: "#858585" }}
			>
				<InfoOutline sx={{ fontSize: "58px" }} />
			</IconButton>
		</Tooltip>
	);
};
