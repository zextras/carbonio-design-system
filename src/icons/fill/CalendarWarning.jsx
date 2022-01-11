/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as React from 'react';

function SvgCalendarWarning(props) {
	return (
		<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M21 19c0 1.647-1.354 3-3 3H6c-1.646 0-3-1.353-3-3V7c0-1.645 1.354-3 3-3h1v-.999c0-.549.451-1 1-1 .549 0 1 .451 1 1v1h6V3c0-.549.451-1 1-1 .549 0 1 .451 1 1v1h1c1.646 0 3 1.354 3 3v12zm-9-3a1 1 0 110 2.002A1 1 0 0112 16zm0-7c-.549 0-1 .452-1 1v4c0 .55.451 1 1 1 .549 0 1-.45 1-1v-4c0-.548-.451-1-1-1z"
			/>
		</svg>
	);
}

export default SvgCalendarWarning;
