import React, { CSSProperties } from "react";

import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

interface ISearchButtonProps {
	onClick: () => void;
	style?: CSSProperties;
}

export const SearchButton = ({ onClick, style }: ISearchButtonProps) => {
	return (
		<div className="search-btn">
			<IconButton aria-label="Menu" onClick={onClick} size="medium" style={style}>
				<SearchIcon />
			</IconButton>
		</div>
	);
};
