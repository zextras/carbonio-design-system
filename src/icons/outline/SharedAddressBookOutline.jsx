/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as React from 'react';

function SvgSharedAddressBookOutline(props) {
	return (
		<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
			<path d="M19 3c1.646 0 3 1.354 3 3v12c0 1.646-1.354 3-3 3H7c-1.646 0-3-1.354-3-3v-1H3c-.549 0-1-.451-1-1 0-.549.451-1 1-1h1V9H3c-.549 0-1-.451-1-1 0-.549.451-1 1-1h1V6c0-1.646 1.354-3 3-3h12zm0 2H7c-.549 0-1 .451-1 1v1h1c.549 0 1 .451 1 1 0 .549-.451 1-1 1H6v6h1c.549 0 1 .451 1 1 0 .549-.451 1-1 1H6v1c0 .549.451 1 1 1h12c.549 0 1-.451 1-1V6c0-.549-.451-1-1-1z" />
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12.95 9.119a1.972 1.972 0 011.933-2.348 1.97 1.97 0 11-.634 3.833l-1.16 1.014a1.974 1.974 0 010 .76l1.161 1.018a1.967 1.967 0 012.602 1.864 1.97 1.97 0 11-3.901-.38l-1.162-1.018a1.97 1.97 0 11.002-3.73l1.16-1.013z"
			/>
		</svg>
	);
}

export default SvgSharedAddressBookOutline;
