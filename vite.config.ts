import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());

	return {
		plugins: [react(), tsconfigPaths()],
		root: "src/client",
		define: {
			"import.meta.env.VITE_ENV": JSON.stringify(env.VITE_ENV),
			"import.meta.env.VITE_API_KEY": JSON.stringify(env.VITE_API_KEY)
		},
		server: {
			open: true,
			port: env.VITE_PORT ? Number.parseInt(env.VITE_PORT) : 3000,
			strictPort: false,
			hmr: true
		}
	};
});
