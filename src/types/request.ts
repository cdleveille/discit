import { RequestMethod } from "@constants";

import type * as shared from "discit-types";

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
	userId: string | null;
};

export type CreateBagParams = {
	userId: string;
	bagName: string;
};

export type EditBagNameParams = {
	bagId: string;
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

export type ApiErrorUnknown = {
	error?: unknown;
};

export type ApiError = shared.ApiError;
