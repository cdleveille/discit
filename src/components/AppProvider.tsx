"use client";

import { useState } from "react";

import { AppContext } from "@/contexts";
import { View } from "@/enums";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const [view, setView] = useState(View.Search);

	return <AppContext.Provider value={{ view, setView }}>{children}</AppContext.Provider>;
};
