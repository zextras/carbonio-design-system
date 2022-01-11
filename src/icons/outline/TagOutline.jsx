/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as React from 'react';

function SvgTagOutline(props) {
	return (
		<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M14.613 3.21a1.26 1.26 0 00-.211.018c-.429.011-.854.18-1.18.507l-9.505 9.504a1.733 1.733 0 000 2.45l4.57 4.57a1.733 1.733 0 002.45 0l9.505-9.505c.326-.326.495-.751.506-1.18.012-.068.018-.139.018-.211V4.465c0-.692-.563-1.255-1.255-1.255h-4.898zm.043 1.967H18.8V9.32l-.008.064-.003.043-9.276 9.275-4.238-4.238 9.275-9.276.043-.002.064-.009z"
			/>
			<path d="M16.467 8.492a.983.983 0 100-1.966.983.983 0 000 1.966z" />
		</svg>
	);
}

export default SvgTagOutline;
