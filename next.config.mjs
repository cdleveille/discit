/** @type {import('next').NextConfig} */
// @ts-check

import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
	dest: "public",
	cacheOnFrontEndNav: true,
	aggressiveFrontEndNavCaching: true,
	reloadOnOnline: true,
	disable: process.env.NODE_ENV === "development",
	workboxOptions: {
		disableDevLogs: true
	}
});

export default withPWA({
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
	}
});
