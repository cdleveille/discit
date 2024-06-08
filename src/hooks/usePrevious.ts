"use client";

import { useEffect, useRef } from "react";

export const usePrevious = <T>(value: T) => {
	const ref = useRef<T>(null);
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
};
