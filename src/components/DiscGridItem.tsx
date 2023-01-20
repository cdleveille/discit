import React, { CSSProperties } from "react";

import { IDisc } from "../types/abstract";
import { AddRemoveButton } from "./AddRemoveButton";

interface IDiscGridItemProps {
	data: IDisc;
	showDiscDetail: (data: IDisc, color: string, backgroundColor: string) => void;
	addDiscToActiveBag: (disc: IDisc) => Promise<void>;
	removeDiscFromActiveBag: (disc: IDisc) => Promise<void>;
	isDiscInActiveBag: (disc: IDisc) => boolean;
	isLoggedIn: boolean;
}

export const DiscGridItem = ({
	data,
	showDiscDetail,
	addDiscToActiveBag,
	removeDiscFromActiveBag,
	isDiscInActiveBag,
	isLoggedIn
}: IDiscGridItemProps) => {
	const color = data.color && data.color !== "#" ? data.color : "#8F633C";
	const backgroundColor = data.background_color && data.background_color !== "#" ? data.background_color : "#C7FF56";

	const styles: CSSProperties = {
		color: color,
		backgroundColor: backgroundColor,
		border: `5px solid ${color + "35"}`
	};

	return data ? (
		<div className="disc-box">
			<div className="disc" style={styles}>
				{isLoggedIn && (
					<AddRemoveButton
						addDiscToActiveBag={addDiscToActiveBag}
						removeDiscFromActiveBag={removeDiscFromActiveBag}
						isDiscInActiveBag={isDiscInActiveBag}
						disc={data}
						size="small"
						className="add-remove-btn-grid"
					/>
				)}
				<div onClick={() => showDiscDetail(data, color, backgroundColor)}>
					<div className="disc-text" style={{ color }}>
						<div className="disc-name" style={{ color }}>
							{data.name}
						</div>
						<div className="disc-fields" style={{ color }}>
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
					</div>
				</div>
			</div>
		</div>
	) : (
		<></>
	);
};

export default DiscGridItem;
