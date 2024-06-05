"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useQueryString = () => {
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();

	const createQueryString = useCallback(
		(name: string, value?: string | null) => {
			const params = new URLSearchParams(searchParams.toString());
			if (value) params.set(name, value);
			else params.delete(name);
			return params.toString();
		},
		[searchParams]
	);

	const updateQueryString = (key: string, value?: string | null) =>
		router.push(pathname + "?" + createQueryString(key, value), { scroll: false });

	return { updateQueryString };
};
