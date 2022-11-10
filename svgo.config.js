/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
module.exports = {
	plugins: [
		{
			name: 'preset-default',
			params: {
				overrides: {
					// avoid auto-remove of fill attributes because it removes also some important fill-rule
					// if there is some unwanted fill attribute, ask UX team to remove it
					removeUselessStrokeAndFill: false
				}
			}
		}
	]
};
