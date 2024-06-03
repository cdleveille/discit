"use server";

import { API } from "@services";

import type { CreateBagParams, AddDiscToBagParams, RemoveDiscFromBagParams, DeleteBagParams } from "@types";

export const createBag = async ({ userId, bagName }: CreateBagParams) => API.createBag({ userId, bagName });

export const addDiscToBag = async ({ bagId, discId }: AddDiscToBagParams) => API.addDiscToBag({ bagId, discId });

export const removeDiscFromBag = async ({ bagId, discId }: RemoveDiscFromBagParams) =>
	API.removeDiscFromBag({ bagId, discId });

export const deleteBag = async ({ bagId }: DeleteBagParams) => API.deleteBag({ bagId });
