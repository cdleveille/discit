import { AlertColor } from "@mui/material/Alert";

import { useApi } from "../hooks/useApi";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { IBag, IDisc, IUser } from "../types/abstract";

export const useLogin = (
	loggedInUser: IUser | undefined,
	setLoggedInUser: (user: IUser | undefined) => void,
	showNotification: (severity: AlertColor, message: string) => void
) => {
	const LOGIN_TOKEN_KEY = "loginToken";

	const { GET, POST, PUT, DELETE } = useApi();
	const { getLocalStorageItem, setLocalStorageItem, removeLocalStorageItem } = useLocalStorage();

	const logIn = async (username: string, password: string) => {
		if (!username || !password) throw "All fields are required.";
		const res = await POST<{ token: string; error: string }>("/user/login", { username, password });
		const { token, error } = res;
		if (error) throw error;
		setLocalStorageItem(LOGIN_TOKEN_KEY, token);
		const user = await validate();
		user && showNotification("success", `${user.username} logged in`);
	};

	const register = async (username: string, password: string) => {
		if (!username || !password) throw "All fields are required.";
		const res = await POST<{ token: string; error: string }>("/user/register", { username, password });
		const { token, error } = res;
		if (error) throw error;
		setLocalStorageItem(LOGIN_TOKEN_KEY, token);
		const user = await validate();
		user && showNotification("success", `${user.username} logged in`);
	};

	const validate = async () => {
		const loginToken = getLocalStorageItem(LOGIN_TOKEN_KEY);
		if (!loginToken) return;
		const res = await POST<IUser & { error: string }>("/user/validate", {}, auth(loginToken));
		const { error } = res;
		if (error) throw error;
		setLoggedInUser(res);
		return res;
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
		const res = await PUT<{ token: string; error: string }>(
			"/user/update/username",
			{ id: loggedInUser.id, username, password },
			auth(loginToken)
		);
		const { token, error } = res;
		if (error) throw error;
		setLocalStorageItem(LOGIN_TOKEN_KEY, token);
		const user = await validate();
		user && showNotification("success", `Username changed: ${user.username}`);
	};

	const changePassword = async (newPassword: string, password: string) => {
		if (!newPassword || !password) throw "All fields are required.";
		const loginToken = getLocalStorageItem(LOGIN_TOKEN_KEY);
		if (!loginToken || !loggedInUser) throw "Not logged in.";
		const res = await PUT<{ token: string; error: string }>(
			"/user/update/password",
			{ id: loggedInUser.id, newPassword, password },
			auth(loginToken)
		);
		const { token, error } = res;
		if (error) throw error;
		setLocalStorageItem(LOGIN_TOKEN_KEY, token);
		const user = await validate();
		user && showNotification("success", "Password changed");
	};

	const deleteAccount = async (password: string) => {
		if (!password) throw "Password field is required.";
		const loginToken = getLocalStorageItem(LOGIN_TOKEN_KEY);
		if (!loginToken || !loggedInUser) throw "Not logged in.";
		const res = await DELETE<IUser & { error: string }>(
			"/user/delete",
			{ id: loggedInUser.id, password },
			auth(loginToken)
		);
		const { username, error } = res;
		if (error) throw error;
		removeLocalStorageItem(LOGIN_TOKEN_KEY);
		setLoggedInUser(undefined);
		username && showNotification("success", `Account deleted: ${username}`);
	};

	const getBags = async () => {
		const loginToken = getLocalStorageItem(LOGIN_TOKEN_KEY);
		if (!loginToken || !loggedInUser) throw "Not logged in.";
		const res = await GET<IBag[] & { error: string }>(`/bag?user_id=${loggedInUser.id}`);
		const { error } = res;
		if (error) throw error;
		return res;
	};

	const createBag = async (name: string) => {
		const loginToken = getLocalStorageItem(LOGIN_TOKEN_KEY);
		if (!loginToken || !loggedInUser) throw "Not logged in.";
		const res = await POST<IBag & { error: string }>(
			"/bag/create",
			{ user_id: loggedInUser.id, name },
			auth(loginToken)
		);
		const { error } = res;
		if (error) throw error;
		return res;
	};

	const addDiscToBag = async (id: string, disc: IDisc) => {
		const loginToken = getLocalStorageItem(LOGIN_TOKEN_KEY);
		if (!loginToken || !loggedInUser) throw "Not logged in.";
		const res = await POST<IBag & { error: string }>("/bag/add-disc", { id, disc_id: disc.id }, auth(loginToken));
		const { error } = res;
		if (error) throw error;
		res && showNotification("success", `Added ${disc.name} to bag`);
		return res;
	};

	const removeDiscFromBag = async (id: string, disc: IDisc) => {
		const loginToken = getLocalStorageItem(LOGIN_TOKEN_KEY);
		if (!loginToken || !loggedInUser) throw "Not logged in.";
		const res = await POST<IBag & { error: string }>(
			"/bag/remove-disc",
			{ id, disc_id: disc.id },
			auth(loginToken)
		);
		const { error } = res;
		if (error) throw error;
		res && showNotification("success", `Removed ${disc.name} from bag`);
		return res;
	};

	const auth = (loginToken: string) => ({ Authorization: `Bearer ${loginToken}` });

	return {
		register,
		logIn,
		validate,
		logOut,
		changeUsername,
		changePassword,
		deleteAccount,
		getBags,
		createBag,
		addDiscToBag,
		removeDiscFromBag
	};
};
