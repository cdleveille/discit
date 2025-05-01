export const isClient = typeof window !== "undefined";

const accessStorage = (storage: Storage) => ({
	setItem: (key: string, data: unknown) => storage.setItem(key, JSON.stringify(data)),
	getItem: <T = unknown>(key: string) => {
		const data = storage.getItem(key);
		if (data !== null) return JSON.parse(data) as T;
		return null;
	},
	removeItem: (key: string) => storage.removeItem(key)
});

export const storage = {
	local: accessStorage(window.localStorage),
	session: accessStorage(window.sessionStorage)
};

export const copyToClipboard = (text: string) => {
	if (!isClient) return;
	navigator.clipboard.writeText(text);
};

export const getDiscGradientBackground = (backgroundColor = "#555555") => {
	const innerGradient = backgroundColor === "#000000" ? "#333333" : backgroundColor;
	const outerGradient = backgroundColor === "#000000" ? "#000000" : "#222222";
	return `radial-gradient(circle, ${innerGradient} 50%, ${outerGradient} 100%)`;
};

export const assertGetElementById = (id: string) => {
	const ele = document.getElementById(id);
	if (!ele) throw new Error(`Element with id "${id}" not found`);
	return ele;
};
