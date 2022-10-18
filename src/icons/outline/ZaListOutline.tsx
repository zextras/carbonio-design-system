/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgZaListOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M17.704 6.29a1 1 0 00-.32-.21.999.999 0 00-.39-.08h-.1a.819.819 0 00-.46.17.995.995 0 00-.13.09l-3 2.86a1.001 1.001 0 001.38 1.45l1.31-1.23V17c0 .549.451 1 1 1 .549 0 1-.451 1-1V9.41l1.29 1.3a1 1 0 001.42 0 1 1 0 000-1.42l-3-3z" />
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M10.977 12a1 1 0 00-1-1h-5.98a1 1 0 000 2h5.98a1 1 0 001-1zM10.977 17a1 1 0 00-1-1h-5.98a1 1 0 000 2h5.98a1 1 0 001-1zM10.977 7a1 1 0 00-1-1h-5.98a1 1 0 000 2h5.98a1 1 0 001-1z"
		/>
	</svg>
);

export default SvgZaListOutline;
