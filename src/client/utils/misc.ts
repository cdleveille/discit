export const getArrayIntersection = <T>(...arrays: T[][]) => {
	return arrays.slice(1).reduce((acc, array) => {
		return acc.filter(value => array.includes(value));
	}, arrays[0]);
};
