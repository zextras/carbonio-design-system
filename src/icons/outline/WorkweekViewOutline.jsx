/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as React from 'react';

function SvgWorkweekViewOutline(props) {
	return (
		<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
			<path d="M15 4v-.999c0-.549.451-1 1-1 .549 0 1 .451 1 1v1h1c1.646 0 3 1.354 3 3v12c0 1.646-1.354 3-3 3H6c-1.646 0-3-1.354-3-3v-12c0-1.646 1.354-3 3-3h1V3a1.006 1.006 0 01.751-.968.991.991 0 01.946.254C8.888 2.474 9 2.733 9 3v1h6zm3 16.001c.549 0 1-.452 1-1v-12c0-.549-.451-1-1-1h-1v1c0 .549-.451 1-1 1-.549 0-1-.451-1-1V6H9v1c0 .549-.451 1-1 1-.549 0-1-.451-1-1V6H6c-.549 0-1 .451-1 1v12a1.006 1.006 0 00.68.947c.104.035.211.052.32.053h12z" />
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M15.57 10.993a1 1 0 00-2 0V17a1 1 0 002 0v-6.006zM10.438 10.993a1 1 0 00-2 0V17a1 1 0 002 0v-6.006z"
			/>
		</svg>
	);
}

export default SvgWorkweekViewOutline;
