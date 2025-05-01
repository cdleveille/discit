import { SocketEvent } from "@constants";
import { Config } from "@utils";

if (!Config.IS_PROD) {
	const { io } = await import("socket.io-client");
	const socket = io(`${location.protocol}//${location.hostname}:${Config.WS_PORT}`);
	socket.on(SocketEvent.Reload, () => location.reload());
}
