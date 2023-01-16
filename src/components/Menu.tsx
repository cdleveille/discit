import React from "react";

import InfoIcon from "@mui/icons-material/Info";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import RefreshIcon from "@mui/icons-material/Refresh";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";

import { IUser } from "../types/abstract";

interface IMenuProps {
	loggedInUser: IUser | undefined;
	loginClickHandler: () => void;
	menuProfileClickHandler: () => void;
	refreshClickHandler: () => void;
	aboutClickHandler: () => void;
	logoutClickHandler: () => void;
}

export const Menu = ({
	loggedInUser,
	loginClickHandler,
	menuProfileClickHandler,
	refreshClickHandler,
	aboutClickHandler,
	logoutClickHandler
}: IMenuProps) => {
	return (
		<Paper elevation={3} sx={{ width: 200, maxWidth: "100%" }}>
			<MenuList>
				{loggedInUser ? (
					<MenuItem className="menu-item" onClick={menuProfileClickHandler}>
						<ListItemIcon>
							<PersonIcon fontSize="medium" />
						</ListItemIcon>
						<ListItemText>{loggedInUser.username}</ListItemText>
					</MenuItem>
				) : (
					<MenuItem className="menu-item" onClick={loginClickHandler}>
						<ListItemIcon>
							<LoginIcon fontSize="medium" />
						</ListItemIcon>
						<ListItemText>Log In / Register</ListItemText>
					</MenuItem>
				)}
				<Divider />
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
				{loggedInUser && (
					<MenuItem className="menu-item" onClick={logoutClickHandler}>
						<ListItemIcon>
							<LogoutIcon fontSize="medium" />
						</ListItemIcon>
						<ListItemText>Log Out</ListItemText>
					</MenuItem>
				)}
			</MenuList>
		</Paper>
	);
};

export default Menu;