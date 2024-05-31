"use client";

import { useContext, useState } from "react";

import { DiscContext } from "@components";
import { Stack } from "@mui/material";
import { hexToRgba } from "@util";

import type { DiscProps } from "@types";

export const Disc = ({ disc }: DiscProps) => {
	const [isHovered, setIsHovered] = useState(false);

	const { setDiscDetail } = useContext(DiscContext);

	const {
		name,
		brand,
		category,
		stability,
		speed,
		glide,
		turn,
		fade,
		color,
		background_color: backgroundColor
	} = disc;

	const borderColor = hexToRgba(color, 0.25);

	return (
		<div className="disc-container">
			<div
				className="disc"
				style={{ color, backgroundColor, border: `5px solid ${borderColor}` }}
				onClick={() => setDiscDetail(disc)}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<Stack spacing="0.25rem">
					<div className="disc-name">{name}</div>
					{isHovered && (
						<Stack className="disc-info" spacing="0.25rem">
							<div>{brand}</div>
							<div>{category}</div>
							<div>{stability}</div>
							<div>
								{speed}&nbsp;|&nbsp;{glide}&nbsp;|&nbsp;{turn}&nbsp;|&nbsp;{fade}
							</div>
						</Stack>
					)}
				</Stack>
			</div>
		</div>
	);
};
