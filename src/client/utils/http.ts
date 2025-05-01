import type { THeaders } from "@types";

export const http = {
	GET: async <T>(url: string, { headers }: { headers?: THeaders } = {}) =>
		request<T>({ url, method: "GET", headers }),
	POST: async <T>(url: string, { headers, body }: { headers?: THeaders; body?: unknown } = {}) =>
		request<T>({ url, method: "POST", headers, body }),
	PUT: async <T>(url: string, { headers, body }: { headers?: THeaders; body?: unknown } = {}) =>
		request<T>({ url, method: "PUT", headers, body }),
	PATCH: async <T>(url: string, { headers, body }: { headers?: THeaders; body?: unknown } = {}) =>
		request<T>({ url, method: "PATCH", headers, body }),
	DELETE: async <T>(
		url: string,
		{ headers, body }: { headers?: THeaders; body?: unknown } = {}
	) => request<T>({ url, method: "DELETE", headers, body })
};

const request = async <T>({
	url,
	method,
	headers,
	body
}: { url: string; method: string; headers?: THeaders; body?: unknown }) => {
	const res = await fetch(url, {
		method,
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			...(headers ?? [])
		},
		body: body ? JSON.stringify(body) : undefined
	});
	const data = (await res.json()) as T;
	if (!res.ok) throw data ?? new Error("Request failed", { cause: res });
	return data;
};

export const calculateMsUntilMidnightET = () => {
	const now = new Date();
	// Convert to Eastern Time using date strings
	const etNow = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));

	// Set up midnight for the next day
	const midnight = new Date(etNow);
	midnight.setHours(24, 0, 0, 0); // Next day at midnight

	// Calculate milliseconds until midnight
	return midnight.getTime() - etNow.getTime();
};
