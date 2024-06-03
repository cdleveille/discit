import { RequestMethod } from "@constants";

export type RequestParams = {
	path: string;
	method: RequestMethodOption;
	accept?: string;
	body?: unknown;
	tags?: string[];
	cache?: RequestCache;
};

export type RequestMethodOption = `${RequestMethod}`;

export type GetBagParams = {
	userId?: string;
};

export type CreateBagParams = {
	userId: string;
	bagName: string;
};

export type AddDiscToBagParams = {
	bagId: string;
	discId: string;
};

export type RemoveDiscFromBagParams = {
	bagId: string;
	discId: string;
};

export type DeleteBagParams = {
	bagId: string;
};
