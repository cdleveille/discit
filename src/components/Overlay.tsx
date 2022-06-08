import React, { useEffect, useState } from "react";

interface IOverlayProps {
	visible: boolean;
	onClick: () => void;
}

export const Overlay: React.FC<IOverlayProps> = ({ visible, onClick }) => {
	const [className, setClassName] = useState("overlay overlay-hidden");

	useEffect(() => {
		setClassName(visible ? "overlay overlay-visible" : "overlay overlay-hidden");
	}, [visible]);

	return <div className={className} onClick={() => onClick()}></div>;
};

export default Overlay;
