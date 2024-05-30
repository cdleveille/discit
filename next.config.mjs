/** @type {import('next').NextConfig} */

const nextConfig = {
	experimental: {
		reactCompiler: true
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "s3.amazonaws.com"
			}
		]
	}
};

export default nextConfig;
