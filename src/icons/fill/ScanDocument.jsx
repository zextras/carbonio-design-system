/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as React from 'react';

function SvgScanDocument(props) {
	return (
		<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
			<path d="M20 18.02v1.48a2.542 2.542 0 01-2.53 2.5H6.53A2.542 2.542 0 014 19.5v-1.48h16z" />
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M4 12.091v-7.59A2.542 2.542 0 016.56 2h7a1 1 0 01.74.33l5.44 6A1 1 0 0120 9v3.09H4zm10-7.09l2.74 3h-2A.793.793 0 0114 7.15V5z"
			/>
			<path d="M21.003 14.07H2.997a.99.99 0 100 1.98h18.006a.99.99 0 100-1.98z" />
		</svg>
	);
}

export default SvgScanDocument;
