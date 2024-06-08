"use client";

import { useCallback, useState } from "react";

import { log } from "@services";
import * as API from "@services/api";
import { getErrorMessage } from "@util";

import type {
	AddDiscToBagParams,
	ApiError,
	ApiErrorUnknown,
	CreateBagParams,
	DeleteBagParams,
	EditBagNameParams,
	RemoveDiscFromBagParams
} from "@types";

export const useApi = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const asyncTemplate = useCallback(async <T = unknown>(op: () => Promise<T>) => {
		try {
			setError(null);
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
	}, []);

	const createBag = useCallback(
		async ({ userId, bagName }: CreateBagParams) => asyncTemplate(() => API.createBag({ userId, bagName })),
		[asyncTemplate]
	);

	const editBagName = useCallback(
		async ({ bagId, bagName }: EditBagNameParams) => asyncTemplate(() => API.editBagName({ bagId, bagName })),
		[asyncTemplate]
	);

	const addDiscToBag = useCallback(
		async ({ bagId, discId }: AddDiscToBagParams) => asyncTemplate(() => API.addDiscToBag({ bagId, discId })),
		[asyncTemplate]
	);

	const removeDiscFromBag = useCallback(
		async ({ bagId, discId }: RemoveDiscFromBagParams) =>
			asyncTemplate(() => API.removeDiscFromBag({ bagId, discId })),
		[asyncTemplate]
	);

	const deleteBag = useCallback(
		async ({ bagId }: DeleteBagParams) => asyncTemplate(() => API.deleteBag({ bagId })),
		[asyncTemplate]
	);

	return { isLoading, error, setError, createBag, editBagName, addDiscToBag, removeDiscFromBag, deleteBag };
};
