export const Config = {
	IS_PROD: Bun.env.IS_PROD === "true",
	WS_PORT: Number.parseInt(Bun.env.WS_PORT ?? "3001"),
	API_URL: "https://discit-api.fly.dev",
	API_KEY: Bun.env.API_KEY ?? "",
	CLERK_PUBLISHABLE_KEY: "pk_test_dW5pdGVkLXNpbGt3b3JtLTkuY2xlcmsuYWNjb3VudHMuZGV2JA"
};
