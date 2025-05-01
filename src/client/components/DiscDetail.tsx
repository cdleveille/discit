import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Tooltip } from "@components";
import { useApi, useAppContext } from "@hooks";
import type { TBag, TDisc } from "@types";
import { getDiscGradientBackground } from "@utils";

export const DiscDetail = ({ disc }: { disc: TDisc }) => {
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
		background_color
	} = disc;

	const { selectedBag } = useAppContext();

	const [isInBag, setIsInBag] = useState(isDiscInBag(id, selectedBag));

	const { addDiscToBag, removeDiscFromBag } = useApi();

	const { mutate, isError, error } = isInBag
		? addDiscToBag(selectedBag?.id, id, selectedBag?.user_id)
		: removeDiscFromBag(selectedBag?.id, id, selectedBag?.user_id);

	useEffect(() => {
		setIsInBag(isDiscInBag(id, selectedBag));
	}, [id, selectedBag]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: needed to avoid infinite state update loop
	useEffect(() => {
		if (!isError) return;
		console.error(error);
		if (!selectedBag?.name) return;
		toast.dismiss();
		toast.error(
			`Error ${isInBag ? `adding ${name} to` : `removing ${name} from`} ${selectedBag.name}`
		);
		setIsInBag(current => !current);
	}, [isError, error, selectedBag?.name, name]);

	return (
		<div
			className="disc-detail"
			style={{ color, background: getDiscGradientBackground(background_color) }}
		>
			{selectedBag && (
				<div className="disc-detail-bag-btn">
					<Tooltip title={`${isInBag ? "Remove from" : "Add to"} ${selectedBag.name}`}>
						<IconButton
							className="icon-btn"
							aria-label={isInBag ? "Remove from Bag" : "Add to Bag"}
							onClick={e => {
								e.stopPropagation();
								if (isInBag) {
									mutate();
									toast.success(`Removed ${name} from ${selectedBag.name}`);
									setIsInBag(false);
								} else {
									mutate();
									toast.success(`Added ${name} to ${selectedBag.name}`);
									setIsInBag(true);
								}
							}}
							sx={{ width: "3rem", height: "3rem" }}
						>
							{isInBag ? (
								<RemoveIcon sx={{ fontSize: "2.5rem" }} />
							) : (
								<AddIcon sx={{ fontSize: "2.5rem" }} />
							)}
						</IconButton>
					</Tooltip>
				</div>
			)}
			<div className="disc-detail-name">{name}</div>
			<div className="disc-detail-info">
				<div>
					{brand}&nbsp;|&nbsp;{category}&nbsp;|&nbsp;{stability}
				</div>
				<div>
					{speed}&nbsp;|&nbsp;{glide}&nbsp;|&nbsp;{turn}&nbsp;|&nbsp;{fade}
				</div>
			</div>
			{pic && (
				<div className="disc-detail-img-container">
					<img
						src={pic}
						alt={name}
						width={400}
						height={340}
						className="disc-detail-img"
					/>
				</div>
			)}
		</div>
	);
};

const isDiscInBag = (discId: string, bag: TBag | null) => {
	if (!bag?.discs) return false;
	return bag.discs.some(discIdInBag => discIdInBag === discId);
};
