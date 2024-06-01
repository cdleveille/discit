"use client";

import { useContext } from "react";

import { DiscContext } from "@contexts";

export const useDiscContext = () => {
	const context = useContext(DiscContext);
	if (!context) throw new Error("useDiscContext must be used within DiscContextProvider");
	return context;
};
