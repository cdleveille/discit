import React, { CSSProperties } from "react";

interface IOverlayProps {
	visible: boolean;
	onClick: () => void;
}

export const Overlay: React.FC<IOverlayProps> = ({ visible, onClick }) => {
	const styles: CSSProperties = {
		zIndex: visible ? 50 : 20,
		opacity: visible ? "50%" : "0%",
		pointerEvents: visible ? "all" : "none"
	};

	return <div className="overlay" style={styles} onClick={() => onClick()}></div>;
};

export default Overlay;
