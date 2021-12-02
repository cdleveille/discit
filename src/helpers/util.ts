import { DiscColors } from "../types/constants";

export const getRandomDiscColor = (): string => {
	return getRandomElementFromArray(DiscColors);
};

export const getRandomElementFromArray = <T>(array: Array<T>): T => {
	return array[Math.floor(Math.random() * array.length)];
};

export const uniqueValue = (value: any, index: number, self: any): boolean => {
	return self.indexOf(value) === index;
};
