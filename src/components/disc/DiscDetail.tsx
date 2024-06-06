"use client";

import Image from "next/image";
import toast from "react-hot-toast";

import { useAuth } from "@clerk/nextjs";
import { IconButton } from "@components";
import { useApi, useAppContext } from "@hooks";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { hexToRgba } from "@util";

import type { DiscDetailProps } from "@types";

export const DiscDetail = ({ disc }: DiscDetailProps) => {
	const { isSignedIn } = useAuth();
	const { selectedBag } = useAppContext();
	const { isLoading, error, addDiscToBag, removeDiscFromBag } = useApi();

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

	const isDiscInBag = selectedBag?.discs.includes(id) ?? false;

	return (
		<div className="disc-detail" style={{ color, backgroundColor, border: `1.5vmin solid ${borderColor}` }}>
			{isSignedIn &&
				selectedBag &&
				(isDiscInBag ? (
					<IconButton
						aria-label="remove"
						onClick={async () => {
							const res = await removeDiscFromBag({ bagId: selectedBag.id, discId: disc.id });
							if (res.error) {
								toast.error("Error removing disc from bag");
								return;
							}
							toast.success(`Removed ${name} from ${selectedBag.name}`);
						}}
						disabled={isLoading}
					>
						<RemoveIcon sx={{ fontSize: "2rem" }} />
					</IconButton>
				) : (
					<IconButton
						aria-label="add"
						onClick={async () => {
							const res = await addDiscToBag({ bagId: selectedBag.id, discId: disc.id });
							if (res.error) {
								toast.error("Error adding disc to bag");
								return;
							}
							toast.success(`Added ${name} to ${selectedBag.name}`);
						}}
						disabled={isLoading}
					>
						<AddIcon sx={{ fontSize: "2rem" }} />
					</IconButton>
				))}
			{!isSignedIn || (!selectedBag && <div style={{ height: "3rem" }}></div>)}
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
		</div>
	);
};
