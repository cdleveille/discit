"use client";

import { useState } from "react";

import * as API from "@services/api";

import type { AddDiscToBagParams, CreateBagParams, DeleteBagParams, RemoveDiscFromBagParams } from "@types";

export const useApi = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const asyncWrapper = async <T = unknown>(op: () => Promise<T>) => {
		try {
			setError("");
			setIsLoading(true);
			const res = (await op()) as T & { error?: string };
			if (res.error) setError(res.error);
			setIsLoading(false);
			return res;
		} catch (error) {
			setError(error as string);
		}
	};

	const createBag = ({ userId, bagName }: CreateBagParams) => asyncWrapper(() => API.createBag({ userId, bagName }));

	const addDiscToBag = ({ bagId, discId }: AddDiscToBagParams) =>
		asyncWrapper(() => API.addDiscToBag({ bagId, discId }));

	const removeDiscFromBag = ({ bagId, discId }: RemoveDiscFromBagParams) =>
		asyncWrapper(() => API.removeDiscFromBag({ bagId, discId }));

	const deleteBag = ({ bagId }: DeleteBagParams) => asyncWrapper(() => API.deleteBag({ bagId }));

	return { isLoading, error, createBag, addDiscToBag, removeDiscFromBag, deleteBag };
};
