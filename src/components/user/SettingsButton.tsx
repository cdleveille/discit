"use client";

import { IconButton } from "@components";
import { useAppContext } from "@hooks";
import TuneIcon from "@mui/icons-material/Tune";

export const SettingsButton = () => {
	const { showSettingsModal } = useAppContext();
	return (
		<IconButton className="settings-btn" aria-label="settings" onClick={showSettingsModal}>
			<TuneIcon sx={{ fontSize: "2rem" }} />
		</IconButton>
	);
};
