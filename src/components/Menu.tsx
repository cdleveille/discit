import React from "react";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import InfoIcon from "@mui/icons-material/Info";

interface IMenuProps {
	aboutClickHandler: () => void;
}

export const Menu = ({ aboutClickHandler }: IMenuProps) => {
	return (
		<Paper elevation={3} sx={{ width: 150, maxWidth: "100%" }}>
			<MenuList>
				<MenuItem className="menu-item" onClick={aboutClickHandler}>
					<ListItemIcon>
						<InfoIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText>About</ListItemText>
				</MenuItem>
			</MenuList>
		</Paper>
	);
};

export default Menu;
