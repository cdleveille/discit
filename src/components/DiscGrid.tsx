import React, { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import DiscGridItem from "./DiscGridItem";
import { IDisc } from "../types/abstract";

interface IDiscGridProps {
	data: IDisc[];
	renderMoreDiscs: () => void;
	showDiscDetail: (data: IDisc, color: string, backgroundColor: string) => void;
	count: number;
	toggleSortOrder: () => void;
	isLoading: boolean;
	setIsScollToTopVisible: (visible: boolean) => void;
}

const DiscGrid: React.FC<IDiscGridProps> = ({ data, renderMoreDiscs, showDiscDetail, count, toggleSortOrder, isLoading, setIsScollToTopVisible }) => {
	useEffect(() => {
		const discGrid = document.getElementById("disc-grid");
		if (discGrid) {
			if (discGrid.clientHeight < window.innerHeight - discGrid.offsetTop) {
				renderMoreDiscs();
			}
		}
	}, [data]);

	if (typeof window !== "undefined" && typeof document !== "undefined") {
		window.onscroll = () => {
			const discGrid = document.getElementById("disc-grid");
			if (discGrid) {
				if (window.innerHeight + document.documentElement.scrollTop + 1 >= discGrid.offsetTop + discGrid.clientHeight) {
					renderMoreDiscs();
				}
			}
			if (document.documentElement.scrollTop > 800) {
				setIsScollToTopVisible(true);
			} else {
				setIsScollToTopVisible(false);
			}
		};
	}

	return (
		<>
			<div className="disc-grid-count" onClick={() => toggleSortOrder()}>
				{isLoading ? (
					<CircularProgress size={56} />
				) : (
					<>
						{count} disc{count === 1 ? "" : "s"}
					</>
				)}
			</div>
			<div className="disc-grid" id="disc-grid">
				{data.map((disc, i) => (
					<DiscGridItem key={i} data={disc} showDiscDetail={showDiscDetail} />
				))}
			</div>
		</>
	);
};

export default DiscGrid;
