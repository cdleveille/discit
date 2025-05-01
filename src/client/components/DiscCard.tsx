import { Link } from "react-router-dom";

import type { TDisc } from "@types";

export const DiscCard = ({ disc }: { disc: TDisc }) => {
	return (
		<div className="disc-card-container">
			<Link
				to={`/${disc.name_slug}`}
				className="disc-card"
				style={{
					color: disc.color,
					background: getDiscGradientBackground(disc.background_color)
				}}
			>
				<div>
					<div className="disc-card-name">{disc.name}</div>
				</div>
			</Link>
		</div>
	);
};

const getDiscGradientBackground = (backgroundColor = "#555555") => {
	const innerGradient = backgroundColor === "#000000" ? "#333333" : backgroundColor;
	const outerGradient = backgroundColor === "#000000" ? "#000000" : "#222222";
	return `radial-gradient(circle, ${innerGradient} 50%, ${outerGradient} 100%)`;
};
