import Config from "../helpers/config";

export const useApi = () => {
	const request = async <T = any>(
		method: string,
		path: string,
		body?: Record<string, string>,
		headers?: Record<string, string>
	) =>
		new Promise<T>((resolve, reject) => {
			fetch(path, {
				method,
				headers: {
					"Content-Type": "application/json",
					...headers
				},
				body: JSON.stringify(body)
			})
				.then(r => resolve(r.json()))
				.catch(e => {
					return reject(e);
				});
		});

	const GET = async <T = any>(path: string) => {
		return request<T>("GET", Config.Public.API_URL + path);
	};

	const POST = async <T = any>(path: string, body?: Record<string, string>, headers?: Record<string, string>) => {
		return request<T>("POST", Config.Public.API_URL + path, body, headers);
	};

	const PUT = async <T = any>(path: string, body?: Record<string, string>, headers?: Record<string, string>) => {
		return request<T>("PUT", Config.Public.API_URL + path, body, headers);
	};

	const DELETE = async <T = any>(path: string, body?: Record<string, string>, headers?: Record<string, string>) => {
		return request<T>("DELETE", Config.Public.API_URL + path, body, headers);
	};

	return { GET, POST, PUT, DELETE };
};
