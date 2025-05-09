import { Env } from "@constants";

const IS_PROD = Bun.env.VITE_ENV === Env.Production;

const PORT = Bun.env.VITE_PORT ? Number.parseInt(Bun.env.VITE_PORT) : 3000;

const API_KEY = Bun.env.VITE_API_KEY;

export const Config = {
	IS_PROD,
	PORT,
	API_KEY
};
