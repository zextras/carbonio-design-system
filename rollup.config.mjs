/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';

const plugins = [
	url({
		include: [
			'**/fonts/**/*.woff',
			'**/fonts/**/*.woff2',
			'**/fonts/**/*.ttf',
			'**/fonts/**/*.eot',
			'**/fonts/**/*.svg'
		],
		limit: Infinity
	}),
	nodeResolve({
		extensions: ['.js', '.jsx', '.ts', '.tsx']
	}),
	commonjs(),
	babel({
		babelHelpers: 'runtime',
		presets: ['@babel/preset-react', '@babel/preset-typescript'],
		plugins: ['@babel/plugin-proposal-class-properties', 'babel-plugin-styled-components'],
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
		ignore: ['node_modules']
	})
];

const external = ['react', 'react-dom', 'styled-components'];

export default [
	{
		input: 'src/index.ts',
		output: {
			file: 'dist/zapp-ui.bundle.js',
			format: 'cjs'
		},
		plugins,
		external
	}
];
