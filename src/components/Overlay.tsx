import React, { useEffect, useState } from "react";
import useKeypress from "react-use-keypress";
import { CSSClasses, Keys } from "../types/constants";

interface IOverlayProps {
	visible: boolean;
	onClick: () => void;
}

export const Overlay: React.FC<IOverlayProps> = ({ visible, onClick }) => {
	const [className, setClassName] = useState<string>(CSSClasses.overlayHidden);

	useKeypress(Keys.escape, (e) => {
		e.preventDefault();
		onClick();
	});

	useEffect(() => {
		setClassName(visible ? CSSClasses.overlayVisible : CSSClasses.overlayHidden);
	}, [visible]);

	return <div className={className} onClick={() => onClick()}></div>;
};

export default Overlay;
