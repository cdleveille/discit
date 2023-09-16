export const uniqueValue = <T,>(value: T, index: number, self: T[]) => {
	return self.indexOf(value) === index;
};

export const stringIncludesString = (a: string, b: string) => {
	return a.toLowerCase().includes(b.toLowerCase());
};

export const stringArrayIncludesString = (a: string[], b: string, exactMatch?: boolean) => {
	if (!a || !b) return false;
	for (const c of a) {
		if (exactMatch) {
			if (b === c) return true;
		} else {
			if (stringIncludesString(b, c)) return true;
		}
	}
	return false;
};

export const getArrayIntersection = <T,>(...arrays: T[][]) => {
	return arrays.slice(1).reduce((acc, array) => {
		return acc.filter(value => array.includes(value));
	}, arrays[0]);
};
