import React from "react";

interface IBackgroundProps {
	onClick: (value: boolean) => void;
}

export const Background: React.FC<IBackgroundProps> = ({ onClick }) => {
	return <div className="background" onClick={() => onClick(false)}></div>;
};

export default Background;
