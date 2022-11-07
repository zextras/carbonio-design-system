/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgScanDocumentOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M20 18.02v1.48a2.542 2.542 0 01-2.53 2.5H6.53A2.542 2.542 0 014 19.5v-1.48h2v1.48a.532.532 0 00.56.5h10.88a.528.528 0 00.56-.5v-1.48h2z" />
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M4 12.091v-7.59A2.542 2.542 0 016.56 2h7a1 1 0 01.74.33l5.44 6A1 1 0 0120 9v3.09h-2V10h-3.29A2.803 2.803 0 0112 7.15V4H6.53a.532.532 0 00-.53.5v7.591H4zm10-7.09l2.74 3h-2A.793.793 0 0114 7.15V5z"
		/>
		<path d="M21.003 14.072H2.997a.99.99 0 100 1.98h18.006a.99.99 0 000-1.98z" />
	</svg>
);

export default SvgScanDocumentOutline;
