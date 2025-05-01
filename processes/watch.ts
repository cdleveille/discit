import chokidar from "chokidar";

import { Path } from "@constants";
import { buildClient } from "@processes";

const watchDir = Path.ClientSrc;
const watcher = chokidar.watch(watchDir, { persistent: true });

const andNowHisWatchIsEnded = async () => {
	watcher.unwatch(watchDir);
	await watcher.close();
};

process.on("exit", () => andNowHisWatchIsEnded);
process.on("SIGINT", () => andNowHisWatchIsEnded);

export const initWatch = (emitReload: () => void) => {
	watcher.on("change", async () => {
		await buildClient();
		emitReload();
	});
};
