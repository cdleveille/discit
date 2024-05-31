import type { Config } from "@types";

export const config: Config = {
	API_URL: process.env.API_URL || "https://discit-api.fly.dev",
	API_KEY: process.env.API_KEY
};
