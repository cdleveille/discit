import { Env } from "@constants";

export const Config = {
	IS_PROD: import.meta.env.VITE_ENV === Env.Production,
	API_URL: "https://discit-api.fly.dev",
	API_KEY: import.meta.env.VITE_API_KEY ?? "",
	CLERK_PUBLISHABLE_KEY: "pk_test_dW5pdGVkLXNpbGt3b3JtLTkuY2xlcmsuYWNjb3VudHMuZGV2JA"
};

if (!Config.API_KEY) {
	throw new Error("Required env var VITE_API_KEY is not set");
}
