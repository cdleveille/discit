import path from "node:path";

import { Config, initSocket, log } from "@helpers";

const { IS_PROD, PORT } = Config;

const publicFolder = path.join(process.cwd(), "public");

if (!IS_PROD) {
	const { buildClient } = await import("@processes");
	await Promise.all([buildClient(), initSocket()]);
}

const server = Bun.serve({
	port: PORT,
	fetch(request) {
		const { pathname } = new URL(request.url);

		// serve index.html for root and non-file requests
		if (!/\.[a-zA-Z0-9]+$/.test(pathname)) {
			return new Response(Bun.file(path.join(publicFolder, "index.html")), {
				headers: { "Content-Type": "text/html" }
			});
		}

		try {
			const filePath = path.join(publicFolder, pathname);
			return new Response(Bun.file(filePath), {
				headers: { "Content-Type": getContentType(filePath) }
			});
		} catch (error) {
			return new Response("Not Found", {
				status: 404,
				headers: { "Content-Type": "text/plain" }
			});
		}
	},
	development: !IS_PROD
});

log.info(`HTTP server started on ${server.url.origin}`);

const getContentType = (pathname: string) => {
	if (pathname.endsWith(".html")) return "text/html";
	if (pathname.endsWith(".css")) return "text/css";
	if (pathname.endsWith(".js")) return "text/javascript";
	if (pathname.endsWith(".json")) return "application/json";
	if (pathname.endsWith(".png")) return "image/png";
	if (pathname.endsWith(".jpg") || pathname.endsWith(".jpeg")) return "image/jpeg";
	if (pathname.endsWith(".svg")) return "image/svg+xml";
	return "text/plain";
};
