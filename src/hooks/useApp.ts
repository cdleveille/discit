import { useContext } from "react";

import { AppContext } from "@/contexts";

export const useApp = () => {
	const ctx = useContext(AppContext);
	if (!ctx) throw new Error("useApp must be used within a child component of AppProvider!");
	return ctx;
};
