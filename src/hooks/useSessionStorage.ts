"use client";

import { isClient } from "@util";

export const useSessionStorage = () => {
	if (!isClient)
		return {
			setSessionStorageItem: () => {},
			getSessionStorageItem: () => null,
			removeSessionStorageItem: () => {}
		};

	const setSessionStorageItem = (key: string, data: unknown) => {
		window?.sessionStorage?.setItem(key, JSON.stringify(data));
	};

	const getSessionStorageItem = <T = unknown>(key: string) => {
		const data = window?.sessionStorage?.getItem(key);
		if (data) return JSON.parse(data) as T;
		return null;
	};

	const removeSessionStorageItem = (key: string) => {
		window?.sessionStorage?.removeItem(key);
	};

	return { setSessionStorageItem, getSessionStorageItem, removeSessionStorageItem };
};
