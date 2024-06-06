import Image from "next/image";

import { SettingsButton, UserButton } from "@components";
import { Stack } from "@mui/material";

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
			<SettingsButton />
		</Stack>
	);
};
