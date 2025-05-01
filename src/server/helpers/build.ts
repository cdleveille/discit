export const now = () => performance?.now() ?? Date.now();

export const parseArg = (arg: string) => Bun.argv.find(a => a.startsWith(arg))?.split("=")[1];
