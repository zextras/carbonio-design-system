/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as React from 'react';

function SvgViewOff(props) {
	return (
		<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
			<path d="M21 10v8c0 1.646-1.354 3-3 3H6c-1.646 0-3-1.354-3-3v-8h18zM3 8V6c0-1.646 1.354-3 3-3h12c1.646 0 3 1.354 3 3v2H3z" />
		</svg>
	);
}

export default SvgViewOff;
