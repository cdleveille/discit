"use client";

import Image from "next/image";

import { UserButton } from "@components";
import { useAppContext } from "@hooks";
import TuneIcon from "@mui/icons-material/Tune";
import { IconButton, Stack } from "@mui/material";

export const Header = () => {
	const { showSettingsModal } = useAppContext();
	return (
		<Stack direction="row" justifyContent="space-between" width="100%">
			<div style={{ width: "3rem", height: "3rem" }}>
				<UserButton />
			</div>
			<Stack direction="row" spacing={-2} alignItems="center" className="title">
				<Image src="/img/discit.svg" alt="DiscIt" width={100} height={100} priority />
				<h1>DiscIt</h1>
			</Stack>
			<div style={{ width: "3rem", height: "3rem" }} className="settings-btn" onClick={showSettingsModal}>
				<IconButton aria-label="settings">
					<TuneIcon sx={{ fontSize: "2rem" }} />
				</IconButton>
			</div>
		</Stack>
	);
};
