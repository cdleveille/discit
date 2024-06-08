import type { Config } from "@types";

export const config: Config = {
	API_URL: process.env.API_URL as string,
	API_KEY: process.env.API_KEY as string
};
