"use client";

import { useEffect } from "react";

export const useKeyPress = (key?: string, action?: () => void) => {
	useEffect(() => {
		if (!key || !action) return;
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === key) action();
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [key, action]);
};
