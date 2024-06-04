"use server";

import { revalidateTag } from "next/cache";

import { API } from "@services";

import type { CreateBagParams, AddDiscToBagParams, RemoveDiscFromBagParams, DeleteBagParams } from "@types";
export const createBag = async ({ userId, bagName }: CreateBagParams) => {
	revalidateTag("bag");
	return API.createBag({ userId, bagName });
};

export const addDiscToBag = async ({ bagId, discId }: AddDiscToBagParams) => {
	revalidateTag("bag");
	return API.addDiscToBag({ bagId, discId });
};

export const removeDiscFromBag = async ({ bagId, discId }: RemoveDiscFromBagParams) => {
	revalidateTag("bag");
	return API.removeDiscFromBag({ bagId, discId });
};

export const deleteBag = async ({ bagId }: DeleteBagParams) => {
	revalidateTag("bag");
	return API.deleteBag({ bagId });
};
