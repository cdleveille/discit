import React from "react";

import DiscGridItem from "./DiscGridItem";
import { getRandomDiscColor } from "../helpers/util";
import { IDisc } from "../types/abstract";

interface IDiscGridProps {
	data: IDisc[];
	renderMoreDiscs: () => void;
	showDiscDetail: (data: IDisc, color: string) => void;
	count: number;
}

const DiscGrid: React.FC<IDiscGridProps> = ({ data, renderMoreDiscs, showDiscDetail, count }) => {
	if (typeof window !== "undefined") {
		window.onscroll = () => {
			if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
				renderMoreDiscs();
			}
		};
	}

	const getDiscs = () => {
		return data.map((disc, i) => <DiscGridItem key={i} data={disc} newColor={getRandomDiscColor()} showDiscDetail={showDiscDetail} />);
	};

	const discs = getDiscs();

	return (
		<>
			<div className="disc-grid-count">
				{count} disc{count === 1 ? "" : "s"}
			</div>
			<div className="disc-grid-inner">{discs}</div>
		</>
	);
};

export default DiscGrid;
