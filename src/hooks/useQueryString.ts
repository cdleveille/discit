"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useQueryString = () => {
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();

	const updateQueryString = useCallback(
		(key: string, value: string | null) => {
			const params = new URLSearchParams(searchParams.toString());
			if (value) params.set(key, value);
			else params.delete(key);
			router.replace(pathname + "?" + params.toString(), { scroll: false });
		},
		[pathname, router, searchParams]
	);

	return { updateQueryString };
};
