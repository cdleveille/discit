"use client";

import Image from "next/image";
import toast from "react-hot-toast";

import { useAuth } from "@clerk/nextjs";
import { IconButton } from "@components";
import { useApi, useAppContext } from "@hooks";
import AddIcon from "@mui/icons-material/Add";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import RemoveIcon from "@mui/icons-material/Remove";
import { copyToClipboard, hexToRgba } from "@util";

import type { DiscDetailProps } from "@types";
export const DiscDetail = ({ disc }: DiscDetailProps) => {
	const { isSignedIn } = useAuth();
	const { filteredDiscs, selectedBag, showDiscDetailModal } = useAppContext();
	const { isLoading, addDiscToBag, removeDiscFromBag } = useApi();

	const previousDisc = filteredDiscs[filteredDiscs.indexOf(disc) - 1];
	const nextDisc = filteredDiscs[filteredDiscs.indexOf(disc) + 1];

	const showPreviousDisc = () => previousDisc && showDiscDetailModal(previousDisc);
	const showNextDisc = () => nextDisc && showDiscDetailModal(nextDisc);

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
		<div
			className="disc-detail"
			style={{ color, backgroundColor, border: `1.5vmin solid ${borderColor}` }}
			onClick={() => {
				copyToClipboard(window.location.href);
				toast.success("Copied link");
			}}
		>
			{isSignedIn &&
				selectedBag &&
				(isDiscInBag ? (
					<IconButton
						aria-label="remove"
						onClick={async () => {
							const res = await removeDiscFromBag({ bagId: selectedBag.id, discId: disc.id });
							if (res.error) return toast.error("Error removing disc from bag");
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
							if (res.error) return toast.error("Error adding disc to bag");
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
			<IconButton
				aria-label="previous"
				onClick={showPreviousDisc}
				onKey={{ keyCode: "ArrowLeft", action: showPreviousDisc }}
				disabled={!previousDisc}
				className="absolute-centered-vertically"
				style={{ left: "3vmin", cursor: !previousDisc ? "auto" : "pointer" }}
			>
				<NavigateBeforeIcon sx={{ fontSize: "2rem" }} />
			</IconButton>
			<IconButton
				aria-label="next"
				onClick={showNextDisc}
				onKey={{ keyCode: "ArrowRight", action: showNextDisc }}
				disabled={!nextDisc}
				className="absolute-centered-vertically"
				style={{ right: "3vmin", cursor: !nextDisc ? "auto" : "pointer" }}
			>
				<NavigateNextIcon sx={{ fontSize: "2rem" }} />
			</IconButton>
		</div>
	);
};
