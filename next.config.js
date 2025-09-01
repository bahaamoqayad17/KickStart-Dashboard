const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./src/locales/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: function (config) {
		config.module.rules.push({
			test: /\.md$/,
			use: 'raw-loader',
		});
		return config;
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	reactStrictMode: true,
	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		ignoreBuildErrors: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'bariq.s3.eu-central-1.amazonaws.com',
			},
		],
	},
	experimental: {
		serverActions: {
			bodySizeLimit: '25mb', // Increase body size limit for file uploads
		},
	},
};

module.exports = withNextIntl(nextConfig);
