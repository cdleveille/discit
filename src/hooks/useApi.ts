import { RequestMethod } from "@constants";
import { config } from "@services";

import type { Disc, RequestMethodOption } from "@types";

export const useApi = () => {
	const request = async <T>(path: string, method: RequestMethodOption, body?: unknown) => {
		const res = await fetch(`${config.API_URL}/${path}`, {
			method,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${config.API_KEY}`
			},
			body: JSON.stringify(body)
		});
		return res.json() as Promise<T>;
	};

	const getDiscs = async () => request<Disc[]>("disc", RequestMethod.GET);

	return { getDiscs };
};
