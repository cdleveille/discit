"use client";

import Image from "next/image";

import { Auth } from "@components";
import { Stack } from "@mui/material";

export const Header = () => {
	return (
		<Stack direction="row" justifyContent="space-between" width="100%">
			<div style={{ width: "3rem" }}>
				<Auth />
			</div>
			<Stack direction="row" spacing={-2} alignItems="center" className="title">
				<Image src="/discit.svg" alt="DiscIt" width={100} height={100} priority />
				<h1>DiscIt</h1>
			</Stack>
			<div className="hidden" style={{ width: "3rem" }}></div>
		</Stack>
	);
};
