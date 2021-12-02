import React, { CSSProperties, useEffect, useState } from "react";

import { IDisc } from "../types/abstract";

interface IDiscGridItemProps {
	data: IDisc;
	newColor: string;
	showDiscDetail: (data: IDisc, color: string) => void;
}

export const DiscGridItem: React.FC<IDiscGridItemProps> = ({ data, newColor, showDiscDetail }) => {
	const [color, setColor] = useState("");

	useEffect(() => {
		setColor(newColor);
	}, []);

	const styles: CSSProperties = {
		backgroundColor: color
	};

	return data ? (
		<div className="disc-box">
			<div className="disc" style={styles} onClick={() => showDiscDetail(data, color)}>
				<div className="disc-inner-circle"></div>
				<div className="disc-text">
					<div className="disc-name">{data.name}</div>
					<div className="disc-fields">
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
