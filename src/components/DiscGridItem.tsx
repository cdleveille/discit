import React, { CSSProperties } from "react";

import { IDisc } from "../types/abstract";
import { DiscColorMap } from "../types/constants";

interface IDiscGridItemProps {
	data: IDisc;
	showDiscDetail: (data: IDisc, color: string, backgroundColor: string) => void;
}

export const DiscGridItem: React.FC<IDiscGridItemProps> = ({ data, showDiscDetail }) => {
	let color = "#8F633C",
		backgroundColor = "#C7FF56";
	if (data) {
		const colorLookup = DiscColorMap.get(data.brand);
		if (colorLookup) {
			color = colorLookup.color;
			backgroundColor = colorLookup.backgroundColor;
		}
	}

	const styles: CSSProperties = {
		color: color,
		backgroundColor: backgroundColor
	};

	const borderStyles: CSSProperties = {
		border: `6px solid ${color + "25"}`
	};

	return data ? (
		<div className="disc-box">
			<div className="disc" style={styles} onClick={() => showDiscDetail(data, color, backgroundColor)}>
				<div className="disc-inner-circle" style={borderStyles}></div>
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
	) : (
		<></>
	);
};

export default DiscGridItem;
