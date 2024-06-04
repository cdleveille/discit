"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { View } from "@constants";

import type { ViewOption } from "@types";

export const useView = () => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const view = searchParams.get("view") as ViewOption | null;

	const [isBagsView, setIsBagsView] = useState(pathname === "/" && view === View.BAGS);

	useEffect(() => {
		if (pathname !== "/") return;
		if (view === View.BAGS) return setIsBagsView(true);
		setIsBagsView(false);
	}, [pathname, view]);

	const isSearchView = !isBagsView;

	return { view, isSearchView, isBagsView };
};
