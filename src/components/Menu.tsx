import React from "react";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import InfoIcon from "@mui/icons-material/Info";
import RefreshIcon from "@mui/icons-material/Refresh";

interface IMenuProps {
	refreshClickHandler: () => void;
	aboutClickHandler: () => void;
}

export const Menu = ({ refreshClickHandler, aboutClickHandler }: IMenuProps) => {
	return (
		<Paper elevation={3} sx={{ width: 180, maxWidth: "100%" }}>
			<MenuList>
				<MenuItem className="menu-item" onClick={refreshClickHandler}>
					<ListItemIcon>
						<RefreshIcon fontSize="medium" />
					</ListItemIcon>
					<ListItemText>Refresh</ListItemText>
				</MenuItem>
				<div className="menu-spacer"></div>
				<MenuItem className="menu-item" onClick={aboutClickHandler}>
					<ListItemIcon>
						<InfoIcon fontSize="medium" />
					</ListItemIcon>
					<ListItemText>About</ListItemText>
				</MenuItem>
			</MenuList>
		</Paper>
	);
};

export default Menu;
