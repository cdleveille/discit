"use client";

import Image from "next/image";
import { useContext } from "react";

import { DiscContext } from "@components";

export const DiscDetail = () => {
	const { discDetail, setDiscDetail } = useContext(DiscContext);

	if (!discDetail) return null;

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
	} = discDetail;

	return (
		<div className="overlay" onClick={() => setDiscDetail(null)}>
			<div className="disc-detail" onClick={e => e.stopPropagation()} style={{ color, backgroundColor }}>
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
				<Image src={pic} alt={name} width={400} height={340} className="disc-detail-img" />
			</div>
		</div>
	);
};
