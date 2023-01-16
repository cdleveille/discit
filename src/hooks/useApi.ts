import Config from "../helpers/config";
import { IResponse } from "../types/abstract";

export const useApi = () => {
	const request = async <T = any>(method: string, path: string, body?: Record<string, string>, headers?: Record<string, string>) => {
		return new Promise<IResponse<T>>((resolve, reject) => {
			fetch(path, {
				method, headers: {
					"Content-Type": "application/json",
					...headers
				}, body: JSON.stringify(body)
			}
			).then(r => r.json()).then(data => {
				return resolve(data);
			}).catch(e => {
				return reject(e);
			});
		});
	};

	const GET = async <T = any>(path: string) => {
		return request<T>("GET", Config.Public.API_URL + path);
	};

	const POST = async <T = any>(path: string, body?: Record<string, string>, headers?: Record<string, string>) => {
		return request<T>("POST", Config.Public.API_URL + path, body, headers);
	};

	return { GET, POST };
};
