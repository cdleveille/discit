import { useEffect, useState } from "react";

export const useIsOffline = () => {
	const [isOffline, setIsOffline] = useState(false);

	useEffect(() => {
		const handleOffline = () => setIsOffline(true);
		const handleOnline = () => setIsOffline(false);

		window.addEventListener("offline", handleOffline);
		window.addEventListener("online", handleOnline);

		return () => {
			window.removeEventListener("offline", handleOffline);
			window.removeEventListener("online", handleOnline);
		};
	}, []);

	return isOffline;
};
