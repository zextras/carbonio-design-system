/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

module.exports = (api) => {
	const isTest = api ? api.env('test') : false;
	// You can use isTest to determine what presets and plugins to use.

	return {
		presets: [
			[
				'@babel/preset-env',
				isTest
					? {
							targets: {
								node: 'current'
							}
					  }
					: {
							modules: false,
							useBuiltIns: 'usage',
							corejs: 3
					  }
			],
			'@babel/preset-react',
			'@babel/preset-typescript'
		],
		plugins: [
			'@babel/plugin-transform-runtime',
			'@babel/plugin-proposal-class-properties',
			'babel-plugin-styled-components',
			'lodash'
		]
	};
};
