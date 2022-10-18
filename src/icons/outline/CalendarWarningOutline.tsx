/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
/*
 * SPDX-FileCopyrightText: 2021 2018 Akveo
 *
 * SPDX-License-Identifier: MIT
 */

import React, { SVGProps } from 'react';

const SvgCalendarWarningOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={24}
		height={24}
		clipRule="evenodd"
		fillRule="evenodd"
		strokeLinejoin="round"
		strokeMiterlimit={2}
		{...props}
	>
		<path d="M0 0h24v24H0z" />
		<path d="M0 0h24v24H0z" />
		<path
			d="M21 19c0 1.646-1.354 3-3 3H6c-1.646 0-3-1.354-3-3V7c0-1.646 1.354-3 3-3h1V3c0-.549.451-1 1-1 .549 0 1 .451 1 1v1h6V3c0-.549.451-1 1-1 .549 0 1 .451 1 1v1h1c1.646 0 3 1.354 3 3zm-2 0V7c0-.549-.451-1-1-1h-1v1c0 .549-.451 1-1 1-.549 0-1-.451-1-1V6H9v1c0 .549-.451 1-1 1-.549 0-1-.451-1-1V6H6c-.549 0-1 .451-1 1v12c0 .549.451 1 1 1h12c.549 0 1-.451 1-1zm-7-3a1 1 0 110 2 1 1 0 010-2zm0-7c-.549 0-1 .451-1 1v4c0 .548.451 1 1 1 .549 0 1-.452 1-1v-4c0-.549-.451-1-1-1z"
			fillRule="nonzero"
		/>
	</svg>
);

export default SvgCalendarWarningOutline;
