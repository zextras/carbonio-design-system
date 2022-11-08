/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
module.exports = {
	typescript: true,
	// eslint-disable-next-line global-require
	template: require('./src/icons/tsTemplate'),
	outDir: './src/icons',
	svgo: true
};
