import { useState } from "react";

import { AlertColor } from "@mui/material/Alert";

import { INotificationProps } from "../components/Notification";

export const useNotification = () => {
	const [notification, setNotification] = useState<INotificationProps>();

	const clearNotification = () => {
		setNotification(undefined);
	};

	const showNotification = (severity: AlertColor, message: string) => {
		clearNotification();
		setNotification({
			open: true,
			severity,
			message,
			clearNotification
		});
	};

	return { notification, clearNotification, showNotification };
};
