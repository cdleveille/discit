"use server";

import { config } from "@/services";

import type { TDisc } from "@/types";

export const getDiscs = async () =>
	request<TDisc[]>({ path: "/disc", method: "GET", tags: ["/disc"], cache: "force-cache" });

const request = async <T = unknown>({
	path,
	method,
	body,
	tags,
	cache
}: {
	path: string;
	method: string;
	body?: unknown;
	tags?: string[];
	cache?: RequestCache;
}): Promise<T> => {
	const res = await fetch(`${config.API_URL}${path}`, {
		method,
		headers: { Authorization: `Bearer ${config.API_KEY}`, "Content-Type": "application/json" },
		body: JSON.stringify(body),
		next: { tags },
		cache
	});
	return res.json();
};
