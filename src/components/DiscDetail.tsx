"use client";

import Image from "next/image";
import Link from "next/link";

import { useDiscContext } from "@hooks";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { hexToRgba } from "@util";

import type { DiscDetailProps } from "@types";
export const DiscDetail = ({ name_slug, hideNavButtons }: DiscDetailProps) => {
	const { discs, filteredDiscs } = useDiscContext();
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

	const previousDiscNameSlug = filteredDiscs[filteredDiscs.indexOf(disc) - 1]?.name_slug;
	const nextDiscNameSlug = filteredDiscs[filteredDiscs.indexOf(disc) + 1]?.name_slug;

	return (
		<div className="disc-detail-container">
			<div className="disc-detail" style={{ color, backgroundColor, border: `1.5vmin solid ${borderColor}` }}>
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
				{pic && (
					<div className="disc-detail-img-container">
						<Image src={pic} alt={name} width={400} height={340} className="disc-detail-img" />
					</div>
				)}
				{!hideNavButtons && (
					<Stack direction="row" spacing="32vmin">
						<Link
							href={`/${previousDiscNameSlug}`}
							className={`disc-detail-nav disc-detail-previous ${!previousDiscNameSlug ? "disabled" : ""}`}
						>
							<IconButton aria-label="previous" disabled={!previousDiscNameSlug}>
								<NavigateBefore sx={{ width: "5vmin", height: "5vmin" }} />
							</IconButton>
						</Link>
						<Link
							href={`/${nextDiscNameSlug}`}
							className={`disc-detail-nav disc-detail-next ${!nextDiscNameSlug ? "disabled" : ""}`}
						>
							<IconButton aria-label="next" disabled={!nextDiscNameSlug}>
								<NavigateNext sx={{ width: "5vmin", height: "5vmin" }} />
							</IconButton>
						</Link>
					</Stack>
				)}
			</div>
		</div>
	);
};
