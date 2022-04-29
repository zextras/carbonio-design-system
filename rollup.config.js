/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';

const plugins = [
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

const external = ['core-js', 'lodash', 'prop-types', 'react', 'react-dom', 'styled-components'];

export default [
	{
		input: 'src/index.ts',
		output: {
			file: 'dist/zapp-ui.bundle.js',
			format: 'cjs'
		},
		plugins: [
			...plugins,
			copy({
				targets: [{ src: 'src/fonts/*', dest: 'dist/fonts' }]
			})
		],
		external
	}
];
