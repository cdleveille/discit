export const log = {
	info: (...data: unknown[]) => console.info(...data),
	warn: (...data: unknown[]) => console.warn(...data),
	error: (...data: unknown[]) => console.error(...data),
	debug: (...data: unknown[]) => console.debug(...data)
};
