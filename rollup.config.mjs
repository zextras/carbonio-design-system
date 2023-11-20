/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';

import pkg from './package.json' assert { type: 'json' };


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
		extensions: ['.mjs', '.js', '.json', '.node', '.ts', '.tsx', '.jsx']
	}),
	commonjs(),
	babel({
		babelHelpers: 'runtime',
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
		ignore: ['node_modules']
	})
];

const external = ['react', 'react-dom', 'styled-components', 'lodash'];

export default [
	{
		input: 'src/index.ts',
		output: [
			{
				file: pkg.main,
				format: 'cjs'
			},
			{
				file: pkg.module,
				format: 'esm'
			}
		],
		plugins,
		external
	},
];
