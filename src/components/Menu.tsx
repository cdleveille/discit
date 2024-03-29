import React from "react";
import { isMobile } from "react-device-detect";

import BackpackIcon from "@mui/icons-material/Backpack";
import InfoIcon from "@mui/icons-material/Info";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";

import { IUser } from "../types/abstract";

const ICON_SIZE = "medium";

interface IMenuProps {
	loggedInUser: IUser | undefined;
	loginClickHandler: () => void;
	menuProfileClickHandler: () => void;
	viewToggleClickHandler: () => void;
	refreshClickHandler: () => void;
	aboutClickHandler: () => void;
	logoutClickHandler: () => void;
	isBagView: boolean;
}

export const Menu = ({
	loggedInUser,
	loginClickHandler,
	menuProfileClickHandler,
	viewToggleClickHandler,
	refreshClickHandler,
	aboutClickHandler,
	logoutClickHandler,
	isBagView
}: IMenuProps) => {
	return (
		<Paper elevation={5} sx={{ width: "fit-content", minWidth: 180 }}>
			<MenuList>
				{loggedInUser ? (
					<MenuItem className="menu-item" onClick={menuProfileClickHandler} autoFocus={!isMobile}>
						<ListItemIcon>
							<PersonIcon fontSize={ICON_SIZE} />
						</ListItemIcon>
						<ListItemText>{loggedInUser.username}</ListItemText>
					</MenuItem>
				) : (
					<MenuItem className="menu-item" onClick={loginClickHandler} autoFocus={!isMobile}>
						<ListItemIcon>
							<LoginIcon fontSize="medium" />
						</ListItemIcon>
						<ListItemText>Log In</ListItemText>
					</MenuItem>
				)}
				<Divider />
				{loggedInUser &&
					(isBagView ? (
						<MenuItem className="menu-item" onClick={viewToggleClickHandler}>
							<ListItemIcon>
								<SearchIcon fontSize={ICON_SIZE} />
							</ListItemIcon>
							<ListItemText>Disc Search</ListItemText>
						</MenuItem>
					) : (
						<MenuItem className="menu-item" onClick={viewToggleClickHandler}>
							<ListItemIcon>
								<BackpackIcon fontSize={ICON_SIZE} />
							</ListItemIcon>
							<ListItemText>My Bag</ListItemText>
						</MenuItem>
					))}
				<MenuItem className="menu-item" onClick={refreshClickHandler}>
					<ListItemIcon>
						<RefreshIcon fontSize={ICON_SIZE} />
					</ListItemIcon>
					<ListItemText>Refresh</ListItemText>
				</MenuItem>
				<MenuItem className="menu-item" onClick={aboutClickHandler}>
					<ListItemIcon>
						<InfoIcon fontSize={ICON_SIZE} />
					</ListItemIcon>
					<ListItemText>About</ListItemText>
				</MenuItem>
				{loggedInUser && (
					<MenuItem className="menu-item" onClick={logoutClickHandler}>
						<ListItemIcon>
							<LogoutIcon fontSize={ICON_SIZE} />
						</ListItemIcon>
						<ListItemText>Log Out</ListItemText>
					</MenuItem>
				)}
			</MenuList>
		</Paper>
	);
};

export default Menu;
