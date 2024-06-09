"use client";

import { useState } from "react";

import { useAppContext } from "@hooks";
import { Stack, Zoom } from "@mui/material";

import type { DiscProps } from "@types";

export const Disc = ({ disc }: DiscProps) => {
	const [isHovered, setIsHovered] = useState(false);

	const { showDiscDetailModal } = useAppContext();

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

	const innerGradient = backgroundColor === "#000000" ? "#333333" : backgroundColor;
	const outerGradient = backgroundColor === "#000000" ? "#000000" : "#222222";

	const gradient: React.CSSProperties = {
		background: `radial-gradient(circle, ${innerGradient} 50%, ${outerGradient} 100%)`
	};

	return (
		<div className="disc-container">
			<div
				className="disc"
				style={{ ...gradient, color }}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				onClick={() => showDiscDetailModal(disc)}
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
			</div>
		</div>
	);
};
