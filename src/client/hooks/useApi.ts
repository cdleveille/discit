import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { QueryKey } from "@constants";
import type { TBag, TDisc } from "@types";
import { http, Config } from "@utils";

const bearerAuth = {
	Authorization: `Bearer ${Config.API_KEY}`
};

export const useApi = () => {
	const queryClient = useQueryClient();

	const invalidateUserBags = useCallback(
		(user_id: string | undefined) => {
			queryClient.invalidateQueries({ queryKey: [QueryKey.GetBags, user_id] });
		},
		[queryClient]
	);

	const getDiscs = () => {
		return useQuery({
			queryKey: [QueryKey.GetDiscs],
			queryFn: () => http.GET<TDisc[]>(`${Config.API_URL}/disc`)
		});
	};

	const getBags = (user_id: string | null | undefined) => {
		return useQuery({
			queryKey: [QueryKey.GetBags, user_id],
			queryFn: () =>
				http.GET<TBag[]>(`${Config.API_URL}/bag?user_id=${user_id}`, {
					headers: bearerAuth
				}),
			enabled: !!user_id,
			placeholderData: undefined
		});
	};

	const addBag = (user_id: string, name: string) => {
		return useMutation({
			mutationFn: () =>
				http.POST<TBag>(`${Config.API_URL}/bag`, {
					headers: bearerAuth,
					body: { user_id, name }
				}),
			onSuccess: () => invalidateUserBags(user_id),
			onError: () => invalidateUserBags(user_id)
		});
	};

	const editBag = (id: string, name: string, user_id: string) => {
		return useMutation({
			mutationFn: () =>
				http.PATCH<TBag>(`${Config.API_URL}/bag`, {
					headers: bearerAuth,
					body: { id, name, user_id }
				}),
			onSuccess: () => invalidateUserBags(user_id),
			onError: () => invalidateUserBags(user_id)
		});
	};

	const deleteBag = (id: string, user_id: string) => {
		return useMutation({
			mutationFn: () =>
				http.DELETE<TBag>(`${Config.API_URL}/bag/${id}`, {
					headers: bearerAuth
				}),
			onSuccess: () => invalidateUserBags(user_id),
			onError: () => invalidateUserBags(user_id)
		});
	};

	const addDiscToBag = (id: string | undefined, disc_id: string, user_id: string | undefined) => {
		return useMutation({
			mutationFn: () =>
				http.PATCH<TBag>(`${Config.API_URL}/bag/add-disc`, {
					headers: bearerAuth,
					body: { id, disc_id }
				}),
			onSuccess: () => invalidateUserBags(user_id),
			onError: () => invalidateUserBags(user_id)
		});
	};

	const removeDiscFromBag = (
		id: string | undefined,
		disc_id: string,
		user_id: string | undefined
	) => {
		return useMutation({
			mutationFn: () =>
				http.PATCH<TBag>(`${Config.API_URL}/bag/remove-disc`, {
					headers: bearerAuth,
					body: { id, disc_id }
				}),
			onSuccess: () => invalidateUserBags(user_id),
			onError: () => invalidateUserBags(user_id)
		});
	};

	return { getDiscs, getBags, addBag, editBag, deleteBag, addDiscToBag, removeDiscFromBag };
};
