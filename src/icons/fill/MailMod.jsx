/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as React from 'react';

function SvgMailMod(props) {
	return (
		<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M4.277 4A2.278 2.278 0 002 6.28v11.483c0 1.258 1.02 2.279 2.277 2.279h15.446A2.278 2.278 0 0022 17.762V6.28C22 5.02 20.98 4 19.723 4H4.277zm9.754 8.02a2.032 2.032 0 01-4.062 0 2.032 2.032 0 014.062 0zm3.75-2.707a1.72 1.72 0 11-3.439-.002 1.72 1.72 0 013.44.002zm-8.125.104a1.407 1.407 0 11-2.814-.002 1.407 1.407 0 012.814.002z"
			/>
		</svg>
	);
}

export default SvgMailMod;
