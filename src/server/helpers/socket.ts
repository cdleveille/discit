import { SocketEvent } from "@constants";
import { Config } from "@helpers";

const { IS_PROD, WS_PORT, HOST, PORT } = Config;

export const initSocket = async () => {
	if (IS_PROD) return;

	const [{ Server }, { initWatch }] = await Promise.all([
		import("socket.io"),
		import("@processes")
	]);

	const io = new Server(WS_PORT, {
		cors: { origin: [HOST, `${HOST}:${PORT}`] },
		serveClient: false
	});

	initWatch(() => io.emit(SocketEvent.Reload));
};
