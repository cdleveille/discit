import { useEffect, useMemo, useState } from "react";

import { STORED_STATE_PREFIX } from "@constants";
import type { TReactStateSetter } from "@types";
import { storage } from "@utils";

export const usePersistedState = <T>(
	initialValue: T,
	id: string,
	isPersistDisabled = false
): [T, TReactStateSetter<T>] => {
	const persistedInitialValue = useMemo(() => {
		if (isPersistDisabled) return initialValue;
		const storedValue = storage.session.getItem<T>(`${STORED_STATE_PREFIX}:${id}`);
		return storedValue ?? initialValue;
	}, [initialValue, id, isPersistDisabled]);

	const [state, setState] = useState<T>(persistedInitialValue);

	useEffect(() => {
		if (isPersistDisabled) return;
		storage.session.setItem(`${STORED_STATE_PREFIX}:${id}`, state);
	}, [id, isPersistDisabled, state]);

	return [state, setState];
};
