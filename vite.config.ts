import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	root: "src/client",
	publicDir: "public",
	server: {
		open: true,
		port: 3000,
		strictPort: false,
		hmr: true
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx"],
		alias: {
			"@components": path.resolve(__dirname, "./src/client/components"),
			"@utils": path.resolve(__dirname, "./src/client/utils"),
			"@hooks": path.resolve(__dirname, "./src/client/hooks"),
			"@constants": path.resolve(__dirname, "./src/types/constants"),
			"@types": path.resolve(__dirname, "./src/types/abstract"),
			"@assets": path.resolve(__dirname, "./src/client/assets"),
			"@helpers": path.resolve(__dirname, "./src/server/helpers"),
			"@processes": path.resolve(__dirname, "./processes")
		}
	}
});
