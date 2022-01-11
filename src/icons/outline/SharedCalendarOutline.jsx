/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as React from 'react';

function SvgSharedCalendarOutline(props) {
	return (
		<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
			<path d="M21 19c0 1.646-1.354 3-3 3H6c-1.646 0-3-1.354-3-3V7c0-1.646 1.354-3 3-3h1V3c0-.549.451-1 1-1 .549 0 1 .451 1 1v1h6V3c0-.549.451-1 1-1 .549 0 1 .451 1 1v1h1c1.646 0 3 1.354 3 3v12zm-2 0V7c0-.549-.451-1-1-1h-1v1c0 .549-.451 1-1 1-.549 0-1-.451-1-1V6H9v1c0 .549-.451 1-1 1-.549 0-1-.451-1-1V6H6c-.549 0-1 .451-1 1v12c0 .549.451 1 1 1h12c.549 0 1-.451 1-1z" />
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M11.931 10.853a1.97 1.97 0 111.298 1.485l-1.16 1.015a1.966 1.966 0 010 .76l1.162 1.017a1.97 1.97 0 11.633 3.833 1.97 1.97 0 01-1.933-2.349l-1.162-1.017a1.97 1.97 0 11.001-3.73l1.161-1.014z"
			/>
		</svg>
	);
}

export default SvgSharedCalendarOutline;
