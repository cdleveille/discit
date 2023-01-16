import { AlertColor } from "@mui/material/Alert";

import { useApi } from "../hooks/useApi";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { IUser } from "../types/abstract";

export const useLogin = (setLoggedInUser: (user: IUser | undefined) => void, showNotification: (severity: AlertColor, message: string) => void) => {
	const LOGIN_TOKEN_KEY = "loginToken";

	const { POST } = useApi();
	const { getLocalStorageItem, setLocalStorageItem, removeLocalStorageItem } = useLocalStorage();

	const register = async (username: string, email: string, password: string) => {
		if (!username || !email || !password) throw "All fields are required.";
		const { data, error } = await POST<{ token: string }>("/user/register", { username, email, password });
		if (error) throw error;
		setLocalStorageItem(LOGIN_TOKEN_KEY, data.token);
		const user = await validate();
		user && showNotification("success", `${user.username} logged in`);
	};

	const logIn = async (username: string, password: string) => {
		if (!username || !password) throw "All fields are required.";
		const { data, error } = await POST("/user/login", { username, password });
		if (error) throw error;
		setLocalStorageItem(LOGIN_TOKEN_KEY, data.token);
		const user = await validate();
		user && showNotification("success", `${user.username} logged in`);
	};

	const validate = async () => {
		const loginToken = getLocalStorageItem(LOGIN_TOKEN_KEY);
		if (!loginToken) return;
		const { data, error } = await POST<IUser>("/user/validate", undefined, {
			"Authorization": `Bearer ${loginToken}`
		});
		if (error) throw error;
		setLoggedInUser(data);
		return data;
	};

	const logOut = async () => {
		const user = await validate();
		removeLocalStorageItem(LOGIN_TOKEN_KEY);
		setLoggedInUser(undefined);
		user && showNotification("success", `${user.username} logged out`);
	};

	return { register, logIn, validate, logOut };
};
