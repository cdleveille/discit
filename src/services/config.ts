import type { Config } from "@types";

export const config: Config = {
	API_URL: process.env.API_URL || "http://localhost:5000",
	API_KEY: "asdf"
};
