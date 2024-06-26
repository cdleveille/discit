import Image from "next/image";

import { AboutButton, UserButton } from "@components";
import { Stack } from "@mui/material";

export const Header = () => {
	return (
		<Stack
			direction="row"
			justifyContent="space-between"
			alignItems="flex-start"
			width="100%"
			padding="1.25rem 1.25rem 0.25rem 1.25rem"
			height="4.75rem"
		>
			<UserButton />
			<Stack direction="row" spacing={-2} alignItems="center" className="title absolute-centered-horizontally">
				<Image src="/img/discit.svg" alt="DiscIt" width={100} height={100} priority />
				<h1>DiscIt</h1>
			</Stack>
			<AboutButton />
		</Stack>
	);
};
