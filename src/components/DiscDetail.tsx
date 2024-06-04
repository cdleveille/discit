"use client";

import Image from "next/image";
import Link from "next/link";

import { useAuth } from "@clerk/nextjs";
import { useApi, useAppContext } from "@hooks";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton, Stack } from "@mui/material";
import { hexToRgba } from "@util";

import type { DiscDetailProps } from "@types";

export const DiscDetail = ({ name_slug, hideNavButtons, hideAddButton }: DiscDetailProps) => {
	const { isSignedIn } = useAuth();
	const { discs, filteredDiscs, selectedBag } = useAppContext();

	const { isLoading, addDiscToBag, removeDiscFromBag } = useApi();

	const disc = discs.find(disc => disc.name_slug === name_slug);
	if (!disc) return null;

	const {
		id,
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

	const isDiscInBag = selectedBag?.discs.includes(id) ?? false;

	return (
		<div className="disc-detail" style={{ color, backgroundColor, border: `1.5vmin solid ${borderColor}` }}>
			{isSignedIn &&
				selectedBag &&
				!hideAddButton &&
				(isDiscInBag ? (
					<div className="add-to-bag-btn">
						<IconButton
							aria-label="remove"
							onClick={async () => {
								await removeDiscFromBag({ bagId: selectedBag.id, discId: disc.id });
							}}
							disabled={isLoading}
						>
							<RemoveIcon sx={{ fontSize: "5vmin" }} />
						</IconButton>
					</div>
				) : (
					<div className="add-to-bag-btn">
						<IconButton
							aria-label="add"
							onClick={async () => {
								await addDiscToBag({ bagId: selectedBag.id, discId: disc.id });
							}}
							disabled={isLoading}
						>
							<AddIcon sx={{ fontSize: "5vmin" }} />
						</IconButton>
					</div>
				))}
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
	);
};
