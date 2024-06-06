export const isClient = typeof window !== "undefined";

export const getArrayIntersection = <T>(...arrays: T[][]) => {
	return arrays.slice(1).reduce((acc, array) => {
		return acc.filter(value => array.includes(value));
	}, arrays[0]);
};

export const hexToRgba = (hex: string, opacity: number) => {
	// Ensure the hex string is valid
	if (!/^#([0-9A-F]{3}){1,2}$/i.test(hex)) {
		throw new Error("Invalid hex color string");
	}

	// Remove the leading '#' if present
	hex = hex.slice(1);

	// If the hex code is in shorthand form (e.g., #03F), convert it to full form (e.g., #0033FF)
	if (hex.length === 3) {
		hex = hex
			.split("")
			.map(char => char + char)
			.join("");
	}

	// Convert hex to RGB
	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);

	// Ensure the opacity is between 0 and 1
	opacity = Math.max(0, Math.min(1, opacity));

	// Return the RGBA color
	return `rgba(${r}, ${g}, ${b}, ${opacity})`;
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
