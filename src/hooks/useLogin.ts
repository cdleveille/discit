import { AlertColor } from "@mui/material/Alert";

import { useApi } from "../hooks/useApi";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { IUser } from "../types/abstract";

export const useLogin = (loggedInUser: IUser | undefined, setLoggedInUser: (user: IUser | undefined) => void, showNotification: (severity: AlertColor, message: string) => void) => {
	const LOGIN_TOKEN_KEY = "loginToken";

	const { POST, PUT, DELETE } = useApi();
	const { getLocalStorageItem, setLocalStorageItem, removeLocalStorageItem } = useLocalStorage();

	const logIn = async (username: string, password: string) => {
		if (!username || !password) throw "All fields are required.";
		const { data, error } = await POST<{ token: string }>("/user/login", { username, password });
		if (error) throw error;
		setLocalStorageItem(LOGIN_TOKEN_KEY, data.token);
		const user = await validate();
		user && showNotification("success", `${user.username} logged in`);
	};

	const register = async (username: string, password: string) => {
		if (!username || !password) throw "All fields are required.";
		const { data, error } = await POST<{ token: string }>("/user/register", { username, password });
		if (error) throw error;
		setLocalStorageItem(LOGIN_TOKEN_KEY, data.token);
		const user = await validate();
		user && showNotification("success", `${user.username} logged in`);
	};

	const validate = async () => {
		const loginToken = getLocalStorageItem(LOGIN_TOKEN_KEY);
		if (!loginToken) return;
		const { data, error } = await POST<IUser>("/user/validate", {}, {
			"Authorization": `Bearer ${loginToken}`
		});
		if (error) throw error;
		setLoggedInUser(data);
		return data;
	};

	const logOut = async () => {
		if (!loggedInUser) throw "Not logged in.";
		const { username } = loggedInUser;
		removeLocalStorageItem(LOGIN_TOKEN_KEY);
		setLoggedInUser(undefined);
		username && showNotification("success", `${username} logged out`);
	};

	const changeUsername = async (username: string, password: string) => {
		if (!username || !password) throw "All fields are required.";
		const loginToken = getLocalStorageItem(LOGIN_TOKEN_KEY);
		if (!loginToken || !loggedInUser) throw "Not logged in.";
		const { id } = loggedInUser;
		const { data, error } = await PUT<{ token: string }>("/user/update", { id, username, password }, {
			"Authorization": `Bearer ${loginToken}`
		});
		if (error) throw error;
		setLocalStorageItem(LOGIN_TOKEN_KEY, data.token);
		const user = await validate();
		user && showNotification("success", `Username changed: ${user.username}`);
	};

	const changePassword = async (newPassword: string, password: string) => {
		if (!newPassword || !password) throw "All fields are required.";
		const loginToken = getLocalStorageItem(LOGIN_TOKEN_KEY);
		if (!loginToken || !loggedInUser) throw "Not logged in.";
		const { id } = loggedInUser;
		const { data, error } = await PUT<{ token: string }>("/user/update", { id, newPassword, password }, {
			"Authorization": `Bearer ${loginToken}`
		});
		if (error) throw error;
		setLocalStorageItem(LOGIN_TOKEN_KEY, data.token);
		const user = await validate();
		user && showNotification("success", "Password changed");
	};

	const deleteAccount = async () => {
		if (!loggedInUser) throw "Not logged in.";
		const loginToken = getLocalStorageItem(LOGIN_TOKEN_KEY);
		if (!loginToken) return;
		const { data, error } = await DELETE<IUser>("/user/delete", { id: loggedInUser.id }, {
			"Authorization": `Bearer ${loginToken}`
		});
		if (error) throw error;
		removeLocalStorageItem(LOGIN_TOKEN_KEY);
		setLoggedInUser(undefined);
		data && showNotification("success", `Account deleted: ${data.username}`);
	};

	return { register, logIn, validate, logOut, changeUsername, changePassword, deleteAccount };
};
