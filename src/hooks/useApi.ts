import { RequestMethod } from "@constants";
import { config } from "@services";

import type { RequestMethodType } from "@types";

import type { Disc } from "@types";

export const useApi = () => {
	const request = async <T>(path: string, method: RequestMethodType, body?: unknown) => {
		const res = await fetch(`${config.API_URL}/${path}`, {
			method,
			headers: {
				"Content-Type": "application/json",
				...(method !== RequestMethod.GET && { Authorization: `Bearer ${config.API_KEY}` })
			},
			body: JSON.stringify(body)
		});
		return res.json() as Promise<T>;
	};

	const getDiscs = async () => request<Disc[]>("disc", RequestMethod.GET);

	return { getDiscs };
};
