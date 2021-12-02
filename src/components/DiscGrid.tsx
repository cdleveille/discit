import React from "react";

import DiscGridItem from "./DiscGridItem";
import { getRandomDiscColor } from "../helpers/util";
import { IDisc } from "../types/abstract";

interface IDiscGridProps {
	data: IDisc[];
	// renderMoreDiscs: () => void;
	showDiscDetail: (data: IDisc, color: string) => void;
}

export const DiscGrid: React.FC<IDiscGridProps> = ({ data, showDiscDetail }) => {
	if (typeof window !== "undefined") {
		window.onscroll = () => {
			if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
				// renderMoreDiscs();
			}
		};
	}

	const discs = data.map((disc, i) => <DiscGridItem key={i} data={disc} newColor={getRandomDiscColor()} showDiscDetail={showDiscDetail} />);

	return <div className="disc-grid-inner">{discs}</div>;
};

export default DiscGrid;
