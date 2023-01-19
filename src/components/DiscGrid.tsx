import React, { CSSProperties, useEffect } from "react";

import CircularProgress from "@mui/material/CircularProgress";

import { IDisc } from "../types/abstract";
import { BagButton } from "./BagButton";
import DiscGridItem from "./DiscGridItem";
import { SearchButton } from "./SearchButton";

interface IDiscGridProps {
	data: IDisc[];
	renderMoreDiscs: () => void;
	showDiscDetail: (data: IDisc, color: string, backgroundColor: string) => void;
	count: number;
	toggleSortOrder: () => void;
	isLoading: boolean;
	setIsScollToTopVisible: (visible: boolean) => void;
	isBagView: boolean;
	setIsBagView: (isBagView: boolean) => void;
	isLoggedIn: boolean;
}

const DiscGrid = ({
	data,
	renderMoreDiscs,
	showDiscDetail,
	count,
	toggleSortOrder,
	isLoading,
	setIsScollToTopVisible,
	isBagView,
	setIsBagView,
	isLoggedIn
}: IDiscGridProps) => {
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
				if (
					window.innerHeight + document.documentElement.scrollTop + 1 >=
					discGrid.offsetTop + discGrid.clientHeight
				) {
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

	const selectedStyle: CSSProperties = { border: "2px solid #6C6C6C" };

	return (
		<div className="disc-grid-header-container">
			<div className="disc-grid-header">
				<div style={{ marginRight: "1em" }}>
					<SearchButton onClick={() => setIsBagView(false)} style={isBagView ? {} : selectedStyle} />
				</div>
				<div className="disc-grid-count">
					{isLoading ? (
						<CircularProgress size={56} />
					) : (
						<div className="disc-grid-count-inner" onClick={toggleSortOrder}>
							{count} disc{count === 1 ? "" : "s"}
						</div>
					)}
				</div>
				<div style={{ marginLeft: "1em" }}>
					<BagButton onClick={() => setIsBagView(true)} style={isBagView ? selectedStyle : {}} />
				</div>
			</div>
			{!isLoading &&
				(!isLoggedIn && isBagView ? (
					<div className="disc-grid-placeholder">Log in to add discs to your bag!</div>
				) : (
					<div className="disc-grid" id="disc-grid">
						{data.map((disc, i) => (
							<DiscGridItem key={i} data={disc} showDiscDetail={showDiscDetail} />
						))}
					</div>
				))}
		</div>
	);
};

export default DiscGrid;
