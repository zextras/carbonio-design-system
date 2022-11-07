/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgInfinityOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M9.184 10.59l-.839-.835a3.16 3.16 0 00-4.468 0 3.16 3.16 0 000 4.467 3.16 3.16 0 004.468 0l5.89-5.861a5.132 5.132 0 017.254 0 5.132 5.132 0 010 7.255 5.132 5.132 0 01-7.255 0l-.847-.824 1.405-1.405.835.835a3.16 3.16 0 004.468 0 3.16 3.16 0 000-4.467 3.16 3.16 0 00-4.467 0l-5.89 5.86a5.132 5.132 0 01-7.254 0 5.132 5.132 0 010-7.254 5.132 5.132 0 017.255 0l.85.823-1.405 1.405z"
		/>
	</svg>
);

export default SvgInfinityOutline;
