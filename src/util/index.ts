export const isClient = typeof window !== "undefined";

export const getArrayIntersection = <T>(...arrays: T[][]) => {
	return arrays.slice(1).reduce((acc, array) => {
		return acc.filter(value => array.includes(value));
	}, arrays[0]);
};

export const sessionStorage = {
	getItem: <T = unknown>(key: string) => {
		if (!isClient) return null;
		const data = window?.sessionStorage.getItem(key);
		if (data) return JSON.parse(data) as T;
		return null;
	},
	setItem: (key: string, data: unknown) => {
		if (!isClient) return;
		window?.sessionStorage.setItem(key, JSON.stringify(data));
	},
	removeItem: (key: string) => {
		if (!isClient) return;
		window?.sessionStorage.removeItem(key);
	}
};

export const getErrorMessage = (error: unknown) => {
	let message: string;
	if (error instanceof Error) {
		message = error.message;
	} else if (error && typeof error === "object" && "message" in error) {
		message = String(error.message);
	} else if (error && typeof error === "object" && "error" in error) {
		message = String(error.error);
	} else if (typeof error === "string") {
		message = error;
	} else {
		message = "An unknown error occurred";
	}
	return message;
};

export const copyToClipboard = (text: string) => {
	if (!isClient) return;
	navigator.clipboard.writeText(text);
};

export const getDiscGradientBackground = (backgroundColor: string) => {
	const innerGradient = backgroundColor === "#000000" ? "#333333" : backgroundColor;
	const outerGradient = backgroundColor === "#000000" ? "#000000" : "#222222";
	return `radial-gradient(circle, ${innerGradient} 50%, ${outerGradient} 100%)`;
};
