"use client";

import Image from "next/image";
import { useContext } from "react";

import { DiscContext, DiscModal } from "@components";
import { hexToRgba } from "@util";

import type { DiscDetailProps } from "@types";
export const DiscDetail = ({ name_slug }: DiscDetailProps) => {
	const { discs } = useContext(DiscContext);
	const disc = discs.find(disc => disc.name_slug === name_slug);
	if (!disc) return null;

	const {
		name,
		brand,
		category,
		stability,
		speed,
		glide,
		turn,
		fade,
		pic,
		color,
		background_color: backgroundColor
	} = disc;

	const borderColor = hexToRgba(color, 0.25);

	return (
		<DiscModal>
			<div
				className="disc-detail"
				onClick={e => e.stopPropagation()}
				style={{ color, backgroundColor, border: `1.5vmin solid ${borderColor}` }}
			>
				<div className="disc-detail-name">{name}</div>
				<div className="disc-detail-info">
					<div>{brand}</div>
					<div>{category}</div>
					<div>{stability}</div>
					<div>
						{speed}&nbsp;|&nbsp;{glide}&nbsp;|&nbsp;{turn}&nbsp;|&nbsp;
						{fade}
					</div>
				</div>
				<div className="disc-detail-img-container">
					<Image src={pic} alt={name} width={400} height={340} className="disc-detail-img" />
				</div>
			</div>
		</DiscModal>
	);
};
