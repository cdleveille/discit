"use client";

import { useState } from "react";

import { log } from "@services";
import * as API from "@services/api";
import { getErrorMessage } from "@util";

import type {
	ApiError,
	AddDiscToBagParams,
	CreateBagParams,
	DeleteBagParams,
	RemoveDiscFromBagParams,
	ApiErrorUnknown
} from "@types";

/**
 * Do NOT use the 'error' state variable to check for errors.
 * Instead, use the 'error' property on the response object.
 * The state variable should be used ONLY to display the error message.
 */
export const useApi = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const asyncWrapper = async <T = unknown>(op: () => Promise<T>) => {
		try {
			setError("");
			setIsLoading(true);
			const res = (await op()) as T & ApiErrorUnknown;
			if (res.error) throw res.error;
			return res as T & ApiError;
		} catch (error) {
			const message = getErrorMessage(error);
			setError(message);
			log.error(message);
			return { error: message } as T & ApiError;
		} finally {
			setIsLoading(false);
		}
	};

	const createBag = ({ userId, bagName }: CreateBagParams) => asyncWrapper(() => API.createBag({ userId, bagName }));

	const addDiscToBag = ({ bagId, discId }: AddDiscToBagParams) =>
		asyncWrapper(() => API.addDiscToBag({ bagId, discId }));

	const removeDiscFromBag = ({ bagId, discId }: RemoveDiscFromBagParams) =>
		asyncWrapper(() => API.removeDiscFromBag({ bagId, discId }));

	const deleteBag = ({ bagId }: DeleteBagParams) => asyncWrapper(() => API.deleteBag({ bagId }));

	return { isLoading, error, setError, createBag, addDiscToBag, removeDiscFromBag, deleteBag };
};
