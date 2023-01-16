import React, { useState } from "react";

import { AlertColor } from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import { IUser } from "../types/abstract";
import { CloseButton } from "./CloseButton";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { TabPanel } from "./TabPanel";

interface ILoginRegisterDialogProps {
	open: boolean;
	onClose: () => void;
	setLoggedInUser: (user: IUser | undefined) => void;
	showNotification: (severity: AlertColor, message: string) => void;
}

export const LoginRegisterDialog = ({ open, onClose, setLoggedInUser, showNotification }: ILoginRegisterDialogProps) => {
	const [tabIndex, setTabIndex] = useState(0);

	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
		setTabIndex(newValue);
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<CloseButton onClick={onClose} />
			<div className="login-dialog">
				<Box>
					<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
						<Tabs value={tabIndex} onChange={handleChange} centered>
							<Tab label="Log In" />
							<Tab label="Register" />
						</Tabs>
					</Box>
					<TabPanel value={tabIndex} index={0}>
						<LoginForm closeDialog={onClose} setLoggedInUser={setLoggedInUser} showNotification={showNotification} />
					</TabPanel>
					<TabPanel value={tabIndex} index={1}>
						<RegisterForm closeDialog={onClose} setLoggedInUser={setLoggedInUser} showNotification={showNotification} />
					</TabPanel>
				</Box>
			</div>
		</Dialog>
	);
};
