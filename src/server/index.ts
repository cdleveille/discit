import path from "node:path";

import { Env } from "@constants";
import { Config, getContentType, log } from "@helpers";

const { IS_PROD, PORT } = Config;

const publicFolder = path.join(process.cwd(), "public");

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

log.info(
	`HTTP server started in ${IS_PROD ? Env.Production : Env.Development} mode on ${server.url.origin}`
);
