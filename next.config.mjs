// @ts-check

import withPWAInit from "@ducanh2912/next-pwa";

const isDev = process.env.NODE_ENV === "development";

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "s3.amazonaws.com"
			},
			{
				protocol: "https",
				hostname: "img.clerk.com"
			}
		]
	},
	experimental: {
		reactCompiler: true
	}
};

const withPWA = withPWAInit({
	dest: "public",
	cacheOnFrontEndNav: true,
	aggressiveFrontEndNavCaching: true,
	reloadOnOnline: true,
	disable: isDev,
	workboxOptions: {
		disableDevLogs: true
	}
});

const config = isDev ? nextConfig : withPWA(nextConfig);

export default config;
