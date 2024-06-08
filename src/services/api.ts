"use server";

import { revalidateTag } from "next/cache";

import { RequestMethod } from "@constants";
import { config } from "@services";

import type {
	AddDiscToBagParams,
	Bag,
	CreateBagParams,
	DeleteBagParams,
	Disc,
	EditBagNameParams,
	GetBagParams,
	RemoveDiscFromBagParams,
	RequestParams
} from "@types";

export const getDiscs = async () =>
	requestJson<Disc[]>({
		path: "/disc",
		method: RequestMethod.GET,
		tags: ["disc"],
		cache: "force-cache"
	});

export const getBags = async ({ userId }: GetBagParams) =>
	requestJson<Bag[]>({
		path: `/bag${userId ? `?user_id=${userId}` : ""}`,
		method: RequestMethod.GET,
		tags: ["bag"],
		cache: "force-cache"
	});

export const createBag = async ({ userId, bagName }: CreateBagParams) => {
	revalidateTag("bag");
	return requestJson<Bag>({
		path: "/bag/create",
		method: RequestMethod.POST,
		body: { user_id: userId, name: bagName }
	});
};

export const editBagName = async ({ bagId, bagName }: EditBagNameParams) => {
	revalidateTag("bag");
	return requestJson<Bag>({
		path: "/bag/update-name",
		method: RequestMethod.PATCH,
		body: { id: bagId, name: bagName }
	});
};

export const addDiscToBag = async ({ bagId, discId }: AddDiscToBagParams) => {
	revalidateTag("bag");
	return requestJson<Bag>({
		path: "/bag/add-disc",
		method: RequestMethod.PATCH,
		body: { id: bagId, disc_id: discId }
	});
};

export const removeDiscFromBag = async ({ bagId, discId }: RemoveDiscFromBagParams) => {
	revalidateTag("bag");
	return requestJson<Bag>({
		path: "/bag/remove-disc",
		method: RequestMethod.PATCH,
		body: { id: bagId, disc_id: discId }
	});
};

export const deleteBag = async ({ bagId }: DeleteBagParams) => {
	revalidateTag("bag");
	return requestJson<Bag>({
		path: `/bag/delete/${bagId}`,
		method: RequestMethod.DELETE
	});
};

const request = ({ path, method, body, tags, cache }: RequestParams) =>
	fetch(`${config.API_URL}${path}`, {
		method,
		headers: { Authorization: `Bearer ${config.API_KEY}` },
		body: JSON.stringify(body),
		next: { tags },
		...(cache && { cache })
	});

const requestJson = async <T = unknown>({ path, method, body, tags, cache }: RequestParams) => {
	const res = await request({ path, method, body, tags, cache });
	return res.json() as Promise<T>;
};
