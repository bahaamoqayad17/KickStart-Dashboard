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
};

module.exports = withNextIntl(nextConfig);
