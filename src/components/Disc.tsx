"use client";

import type { Disc as DiscType } from "@types";
import { Stack } from "@mui/material";

type DiscProps = {
	disc: DiscType;
};

export const Disc = ({ disc }: DiscProps) => {
	const { name, color, background_color: backgroundColor } = disc;
	return (
		<div className="disc-container">
			<div className="disc" style={{ color, backgroundColor }} onClick={() => console.log("clicked")}>
				<Stack>
					<div className="disc-name">{name}</div>
				</Stack>
			</div>
		</div>
	);
};
