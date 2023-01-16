import { useApi } from "../hooks/useApi";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { IUser } from "../types/abstract";

export const useLogin = (setLoggedInUser: (user: IUser | undefined) => void) => {
	const LOGIN_TOKEN_KEY = "loginToken";

	const { POST } = useApi();
	const { getLocalStorageItem, setLocalStorageItem, removeLocalStorageItem } = useLocalStorage();

	const register = async (username: string, email: string, password: string) => {
		if (!username || !email || !password) throw "All fields are required.";
		const { data, error } = await POST<{ token: string }>("/user/register", { username, email, password });
		if (error) throw error;
		setLocalStorageItem(LOGIN_TOKEN_KEY, data.token);
		return validate();
	};

	const logIn = async (username: string, password: string) => {
		if (!username || !password) throw "All fields are required.";
		const { data, error } = await POST("/user/login", { username, password });
		if (error) throw error;
		setLocalStorageItem(LOGIN_TOKEN_KEY, data.token);
		return validate();
	};

	const validate = async () => {
		const loginToken = getLocalStorageItem(LOGIN_TOKEN_KEY);
		if (!loginToken) return;
		const { data, error } = await POST("/user/validate", undefined, {
			"Authorization": `Bearer ${loginToken}`
		});
		if (error) throw error;
		setLoggedInUser(data);
	};

	const logOut = () => {
		removeLocalStorageItem(LOGIN_TOKEN_KEY);
		setLoggedInUser(undefined);
	};

	return { register, logIn, validate, logOut };
};
