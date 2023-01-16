export const useLocalStorage = () => {
	const setLocalStorageItem = (key: string, data: any) => {
		window.localStorage.setItem(key, JSON.stringify(data));
	};

	const getLocalStorageItem = <T = any>(key: string) => {
		const data = window.localStorage.getItem(key);
		if (data) return JSON.parse(data) as T;
		return null;
	};

	const removeLocalStorageItem = (key: string) => {
		window.localStorage.removeItem(key);
	};

	return { setLocalStorageItem, getLocalStorageItem, removeLocalStorageItem };
};
