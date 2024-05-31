import { RequestMethod } from "@constants";
import { config } from "@services";

import type { Disc, RequestMethodOption } from "@types";

export const useApi = () => {
	const request = async <T>({
		path,
		method,
		body,
		tags
	}: {
		path: string;
		method: RequestMethodOption;
		body?: unknown;
		tags?: string[];
	}) => {
		const res = await fetch(`${config.API_URL}/${path}`, {
			method,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${config.API_KEY}`
			},
			body: JSON.stringify(body),
			next: { tags }
		});
		return res.json() as Promise<T>;
	};

	const getDiscs = async () => request<Disc[]>({ path: "disc", method: RequestMethod.GET, tags: ["disc"] });

	return { getDiscs };
};
