import React from "react";

import Alert, { AlertColor } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export interface INotificationProps {
	severity?: AlertColor;
	message?: string;
	clearNotification: () => void;
}

export const Notification = ({ severity, message, clearNotification }: INotificationProps) => {
	const onClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === "clickaway") return;
		clearNotification();
	};

	return severity && message ? (
		<Snackbar onClose={onClose} open={true}>
			<Alert onClose={onClose} className="alert" variant="filled" severity={severity}>
				{message}
			</Alert>
		</Snackbar>
	) : (
		<></>
	);
};
