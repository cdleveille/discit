import { RequestMethod } from "@constants";
import { config } from "@services";

import type { Disc, RequestParams } from "@types";

const requestJson = async <T = unknown>({ url, method, body, tags }: RequestParams) => {
	const res = await fetch(url, {
		method,
		headers: {
			Authorization: `Bearer ${config.API_KEY}`
		},
		body: JSON.stringify(body),
		next: { tags }
	});
	return res.json() as Promise<T>;
};

export const API = {
	getDiscs: async () =>
		requestJson<Disc[]>({
			url: `${config.API_URL}/disc`,
			method: RequestMethod.GET,
			tags: ["disc"]
		})
};
