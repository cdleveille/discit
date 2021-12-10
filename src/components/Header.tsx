import React from "react";

export const Header: React.FC = () => {
	return (
		<div className="header">
			<a href="https://github.com/cdleveille/discit" target="_blank" rel="noreferrer">
				<img src="disc_golf.svg"></img>&nbsp;&nbsp;&nbsp;DiscIt&nbsp;&nbsp;
			</a>
		</div>
	);
};

export default Header;
