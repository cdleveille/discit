import React from "react";

import Alert, { AlertColor } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export interface INotificationProps {
	open?: boolean;
	severity?: AlertColor;
	message?: string;
	clearNotification: () => void;
}

export const Notification = ({ open, severity, message, clearNotification }: INotificationProps) => {
	const onClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === "clickaway") return;
		clearNotification();
	};

	{
		return open && severity && message ? (
			<Snackbar onClose={onClose} open={open} autoHideDuration={3000}>
				<Alert onClose={onClose} className="alert" variant="filled" severity={severity}>
					{message}
				</Alert>
			</Snackbar>
		) : (
			<></>
		);
	}
};
