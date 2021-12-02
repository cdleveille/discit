import React, { CSSProperties } from "react";

interface IOverlayProps {
	visible: boolean;
}

export const Overlay: React.FC<IOverlayProps> = ({ visible }) => {
	const styles: CSSProperties = {
		opacity: visible ? "40%" : "0%"
	};

	return <div className="overlay" style={styles}></div>;
};

export default Overlay;
