import React, { CSSProperties } from "react";

import { IDisc } from "../types/abstract";
import { AddRemoveButton } from "./AddRemoveButton";

interface IDiscDetailProps {
	data: IDisc | null;
	color: string;
	backgroundColor: string;
	visible: boolean;
	spinClass: string;
	addDiscToActiveBag: (disc: IDisc) => Promise<void>;
	removeDiscFromActiveBag: (disc: IDisc) => Promise<void>;
	isDiscInActiveBag: (disc: IDisc) => boolean;
}

export const DiscDetail = ({
	data,
	color,
	backgroundColor,
	visible,
	spinClass,
	addDiscToActiveBag,
	removeDiscFromActiveBag,
	isDiscInActiveBag
}: IDiscDetailProps) => {
	const styles: CSSProperties = {
		color: color,
		backgroundColor: backgroundColor,
		display: visible ? "block" : "none"
	};

	const borderStyles: CSSProperties = {
		border: `8px solid ${color + "35"}`
	};

	const centerStyles: CSSProperties = {
		msTransformOrigin: "center",
		WebkitTransformOrigin: "center",
		transformOrigin: "center",
		top: "50%",
		left: "50%",
		msTransform: "translate(-50%, -50%)",
		WebkitTransform: "translate(-50%, -50%)",
		transform: "translate(-50%, -50%)"
	};

	return data ? (
		<div className={`disc-detail ${spinClass}`} style={{ ...styles, ...borderStyles, ...centerStyles }}>
			<AddRemoveButton
				addDiscToActiveBag={addDiscToActiveBag}
				removeDiscFromActiveBag={removeDiscFromActiveBag}
				isDiscInActiveBag={isDiscInActiveBag}
				disc={data}
			/>
			<div className="disc-detail-container" style={centerStyles}>
				<div className="disc-detail-name" style={{ color }}>
					{data.name}
				</div>
				<div className="disc-detail-fields" style={{ color }}>
					<span>{data.brand}</span>
					<br />
					<span>{data.category}</span>
					<br />
					<span>{data.stability}</span>
					<br />
					<span>
						{data.speed}&nbsp;|&nbsp;{data.glide}&nbsp;|&nbsp;
						{data.turn}&nbsp;|&nbsp;{data.fade}
					</span>
				</div>
				<div className="disc-detail-img">
					<a href={data.link} target="_blank" rel="noreferrer">
						<img src={data.pic} />
					</a>
				</div>
			</div>
		</div>
	) : (
		<></>
	);
};

export default DiscDetail;
