import { Env } from "@constants";

const IS_PROD = Bun.env.BUN_ENV === Env.Production || Bun.env.NODE_ENV === Env.Production;

const PORT = Number.parseInt(Bun.env.PORT ?? "3000");

const WS_PORT = Number.parseInt(Bun.env.WS_PORT ?? "3001");

const HOST = Bun.env.HOST ?? "http://localhost";

const API_KEY = Bun.env.API_KEY;

export const Config = {
	IS_PROD,
	PORT,
	WS_PORT,
	HOST,
	API_KEY
};
