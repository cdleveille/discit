import { AlertColor } from "@mui/material/Alert";

import { useApi } from "../hooks/useApi";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { IUser } from "../types/abstract";

export const useLogin = (setLoggedInUser: (user: IUser | undefined) => void, showNotification: (severity: AlertColor, message: string) => void) => {
	const LOGIN_TOKEN_KEY = "loginToken";

	const { POST, DELETE } = useApi();
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

	const logOut = async (username: string | undefined) => {
		removeLocalStorageItem(LOGIN_TOKEN_KEY);
		setLoggedInUser(undefined);
		username && showNotification("success", `${username} logged out`);
	};

	const deleteAccount = async (id: string) => {
		const loginToken = getLocalStorageItem(LOGIN_TOKEN_KEY);
		const { data, error } = await DELETE<IUser>("/user/delete", { id }, {
			"Authorization": `Bearer ${loginToken}`
		});
		if (error) throw error;
		removeLocalStorageItem(LOGIN_TOKEN_KEY);
		setLoggedInUser(undefined);
		data && showNotification("success", `Account deleted: ${data.username}`);
	};

	return { register, logIn, validate, logOut, deleteAccount };
};
