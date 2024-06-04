import { RequestMethod } from "@constants";
import { config } from "@services";

import type {
	Bag,
	Disc,
	RequestParams,
	GetBagParams,
	CreateBagParams,
	AddDiscToBagParams,
	RemoveDiscFromBagParams,
	DeleteBagParams
} from "@types";

export const API = {
	getDiscs: async () =>
		requestJson<Disc[]>({
			path: "disc",
			method: RequestMethod.GET,
			tags: ["disc"]
		}),
	getBags: async ({ userId }: GetBagParams) =>
		requestJson<Bag[]>({
			path: `bag${userId ? `/user_id=${userId}` : ""}`,
			method: RequestMethod.GET,
			tags: ["bag"]
		}),
	createBag: async ({ userId, bagName }: CreateBagParams) =>
		requestJson<Bag>({
			path: "bag/create",
			method: RequestMethod.POST,
			body: { user_id: userId, name: bagName },
			cache: "no-cache"
		}),
	addDiscToBag: async ({ bagId, discId }: AddDiscToBagParams) =>
		requestJson<Bag>({
			path: "bag/add-disc",
			method: RequestMethod.PUT,
			body: { id: bagId, disc_id: discId },
			cache: "no-cache"
		}),
	removeDiscFromBag: async ({ bagId, discId }: RemoveDiscFromBagParams) =>
		requestJson<Bag>({
			path: "bag/remove-disc",
			method: RequestMethod.PUT,
			body: { id: bagId, disc_id: discId },
			cache: "no-cache"
		}),
	deleteBag: async ({ bagId }: DeleteBagParams) =>
		requestJson<Bag>({
			path: `bag/delete/${bagId}`,
			method: RequestMethod.DELETE,
			cache: "no-cache"
		})
};

const request = async ({ path, method, body, tags, cache = "force-cache" }: RequestParams) =>
	fetch(`${config.API_URL}/${path}`, {
		method,
		headers: { Authorization: `Bearer ${config.API_KEY}` },
		body: JSON.stringify(body),
		next: { tags },
		cache
	});

const requestJson = async <T = unknown>({ path, method, body, tags, cache = "force-cache" }: RequestParams) => {
	const res = await request({ path, method, body, tags, cache });
	return res.json() as Promise<T>;
};
