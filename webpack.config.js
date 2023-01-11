/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');

// supported locales for documentation. Limited in order to reduce bundle size
const supportedLocales = ['en-US', 'es', 'pt-BR', 'ru'];

module.exports = {
	devtool: 'source-map',
	entry: './src/index.js',
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
		alias: {
			'@zextras/carbonio-design-system': path.resolve(__dirname, './src/index.ts'),
			'carbonio-design-system-icons': path.resolve(__dirname, './src/icons/index.ts'),
			'status-table': path.resolve(__dirname, './docs/components/StatusTable.jsx')
		}
	},
	externals: [],
	module: {
		rules: [
			{
				test: /\.[jt]sx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)$/,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[base]'
				}
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			process: 'process/browser'
		}),
		new webpack.ContextReplacementPlugin(
			/^date-fns[/\\]locale$/,
			new RegExp(`\\.[/\\\\](${supportedLocales.join('|')})[/\\\\]index\\.js$`)
		)
	]
};
