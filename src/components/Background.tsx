import React from "react";

interface IBackgroundProps {
	onClick: () => void;
}

export const Background: React.FC<IBackgroundProps> = ({ onClick }) => {
	return <div className="background" onClick={() => onClick()}></div>;
};

export default Background;
