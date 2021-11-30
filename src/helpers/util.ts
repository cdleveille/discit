import { DiscColors } from "../types/constants";

export const getRandomDiscColor = (): string => {
	return getRandomElementFromArray(DiscColors);
};

export const getRandomElementFromArray = <T>(array: Array<T>): T => {
	return array[Math.floor(Math.random() * array.length)];
};
