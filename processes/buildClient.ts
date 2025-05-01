import { $ } from "bun";
import { copyPlugin } from "bun-copy-plugin";

import { Env, Path } from "@constants";
import { Config, log, now, parseArg } from "@helpers";

const isProd = Config.IS_PROD || (parseArg("BUN_ENV") ?? parseArg("NODE_ENV")) === Env.Production;

const src = Path.ClientSrc;
const outdir = Path.Public;

const toCopy = ["icons/", "favicon.ico", "manifest.json"];

export const buildClient = async () => {
	const start = now();

	await $`rm -rf ${outdir}`;

	await Bun.build({
		entrypoints: [`${src}/index.html`, `${src}/sw.ts`],
		outdir,
		define: {
			"Bun.env.IS_PROD": `"${isProd}"`,
			"Bun.env.WS_PORT": `"${Config.WS_PORT}"`,
			"Bun.env.API_KEY": `"${Config.API_KEY}"`
		},
		sourcemap: isProd ? "none" : "linked",
		naming: {
			entry: "[dir]/[name].[ext]",
			asset: "[dir]/[name]~[hash].[ext]",
			chunk: "[dir]/chunk~[hash].[ext]"
		},
		plugins: toCopy.map(path => copyPlugin(`${src}/${path}`, `${outdir}/${path}`)),
		minify: isProd
	});

	const buildMode = isProd ? Env.Production : Env.Development;
	const buildTime = (now() - start).toFixed(2);

	log.info(`Build completed in ${buildMode} mode in ${buildTime}ms`);
};
