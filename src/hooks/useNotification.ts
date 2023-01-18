import { useEffect, useState } from "react";

import { AlertColor } from "@mui/material/Alert";

import { INotificationProps } from "../components/Notification";

export const useNotification = () => {
	const [notification, setNotification] = useState<INotificationProps>();

	useEffect(() => {
		if (!notification) return;
		const timeoutId = setTimeout(() => clearNotification(), 3000);
		return () => clearTimeout(timeoutId);
	}, [notification]);

	const clearNotification = () => {
		setNotification(undefined);
	};

	const showNotification = (severity: AlertColor, message: string) => {
		setNotification({
			severity,
			message,
			clearNotification
		});
	};

	return { notification, clearNotification, showNotification };
};
