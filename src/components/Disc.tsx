"use client";

import { useContext, useState } from "react";

import { DiscContext } from "@components";
import { Stack } from "@mui/material";

import type { DiscProps } from "@types";

export const Disc = ({ disc }: DiscProps) => {
	const [isHovered, setIsHovered] = useState(false);

	const { setDiscDetail } = useContext(DiscContext);

	const { name, color, background_color: backgroundColor } = disc;

	return (
		<div className="disc-container">
			<div
				className="disc"
				style={{ color, backgroundColor }}
				onClick={() => setDiscDetail(disc)}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<Stack spacing="0.25rem">
					<div className="disc-name">{name}</div>
					{isHovered && <DiscInfo disc={disc} />}
				</Stack>
			</div>
		</div>
	);
};

export const DiscInfo = ({ disc }: DiscProps) => {
	const { brand, category, stability, speed, glide, turn, fade } = disc;
	return (
		<Stack className="disc-info" spacing="0.25rem">
			<div>{brand}</div>
			<div>{category}</div>
			<div>{stability}</div>
			<div>
				{speed}&nbsp;|&nbsp;{glide}&nbsp;|&nbsp;{turn}&nbsp;|&nbsp;{fade}
			</div>
		</Stack>
	);
};
