import React, { CSSProperties } from "react";

import { IDisc } from "../types/abstract";

interface IDiscDetailProps {
	data: IDisc | null;
	color: string;
	visible: boolean;
	spinClass: string;
}

export const DiscDetail: React.FC<IDiscDetailProps> = ({ data, color, visible, spinClass }) => {
	const styles: CSSProperties = {
		backgroundColor: color,
		display: visible ? "block" : "none"
	};

	return data ? (
		<div className={`disc-detail ${spinClass}`} style={styles}>
			<div className="disc-detail-inner-circle"></div>
			<div className="disc-detail-container">
				<div className="disc-detail-name">{data.name}</div>
				<div className="disc-detail-fields">
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
					<img src={data.pic} />
				</div>
			</div>
		</div>
	) : (
		<></>
	);
};

export default DiscDetail;
