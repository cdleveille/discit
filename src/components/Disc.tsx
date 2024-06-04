"use client";

import Link from "next/link";
import { useState } from "react";

import { Stack, Zoom } from "@mui/material";
import { hexToRgba } from "@util";

import type { DiscProps } from "@types";

export const Disc = ({ disc }: DiscProps) => {
	const [isHovered, setIsHovered] = useState(false);

	const {
		name,
		name_slug,
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
			<Link
				href={`/disc/${name_slug}`}
				passHref
				className="disc"
				style={{ color, backgroundColor, border: `5px solid ${borderColor}` }}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<Stack spacing="0.25rem">
					<div className="disc-name">{name}</div>
					{isHovered && (
						<Zoom in={true} appear={true}>
							<Stack className="disc-info" spacing="0.25rem">
								<div>{brand}</div>
								<div>{category}</div>
								<div>{stability}</div>
								<div>
									{speed}&nbsp;|&nbsp;{glide}&nbsp;|&nbsp;{turn}&nbsp;|&nbsp;{fade}
								</div>
							</Stack>
						</Zoom>
					)}
				</Stack>
			</Link>
		</div>
	);
};
