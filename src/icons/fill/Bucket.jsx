/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import * as React from 'react';

function SvgBucket(props) {
	return (
		<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
			<path d="M19.27 15.665l-7.977-7.978a1 1 0 011.414-1.415l6.73 6.73L20 4h1c.549 0 1-.451 1-1 0-.549-.451-1-1-1H3c-.549 0-1 .451-1 1 0 .549.451 1 1 1h1l.937 15c0 1.646 1.355 3 3 3h8.125c1.646 0 3-1.354 3-3l.209-3.335z" />
		</svg>
	);
}

export default SvgBucket;
