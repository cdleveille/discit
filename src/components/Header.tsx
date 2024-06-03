"use client";

import Image from "next/image";

import { UserButton } from "@components";
import TuneIcon from "@mui/icons-material/Tune";
import { IconButton, Stack } from "@mui/material";

export const Header = () => {
	return (
		<Stack direction="row" justifyContent="space-between" width="100%">
			<div style={{ width: "3rem", height: "3rem" }}>
				<UserButton />
			</div>
			<Stack direction="row" spacing={-2} alignItems="center" className="title">
				<Image src="/img/discit.svg" alt="DiscIt" width={100} height={100} priority />
				<h1>DiscIt</h1>
			</Stack>
			<div style={{ width: "3rem", height: "3rem" }} className="settings-btn">
				<IconButton aria-label="settings">
					<TuneIcon fontSize="large" />
				</IconButton>
			</div>
		</Stack>
	);
};
