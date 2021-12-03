import { DiscColors } from "../types/constants";

export const getRandomDiscColor = (): string => {
	return getRandomElementFromArray(DiscColors);
};

export const getRandomElementFromArray = <T,>(array: Array<T>): T => {
	return array[Math.floor(Math.random() * array.length)];
};

export const uniqueValue = (value: any, index: number, self: any): boolean => {
	return self.indexOf(value) === index;
};

export const stringIncludesString = (a: string, b: string): boolean => {
	return a.toLowerCase().includes(b.toLowerCase());
};

export const stringArrayIncludesString = (a: string[], b: string, exactMatch?: boolean): boolean => {
	for (const c of a) {
		if (exactMatch) {
			if (b === c) return true;
		} else {
			if (stringIncludesString(b, c)) return true;
		}
	}
	return false;
};

export const getArrayIntersection = <T,>(a: Array<T>, b: Array<T>, c?: Array<T>, d?: Array<T>): Array<T> => {
	const intersection1 = a.filter((value) => b.includes(value));
	const intersection2 = c ? intersection1.filter((value) => c.includes(value)) : intersection1;
	return d ? intersection2.filter((value) => d.includes(value)) : intersection2;
};
