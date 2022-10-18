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

const SvgSeriesOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		clipRule="evenodd"
		fillRule="evenodd"
		strokeLinejoin="round"
		strokeMiterlimit={2}
		width={24}
		height={24}
		{...props}
	>
		<path fill="none" d="M0 0h24v24H0z" />
		<path fill="none" d="M0 0h24v24H0z" />
		<path
			d="M11 4V3c0-.549.451-1 1-1 .549 0 1 .451 1 1v1h1c1.646 0 3 1.354 3 3v8.063c0 1.645-1.354 3-3 3H5.937c-1.645 0-3-1.355-3-3V7c0-1.646 1.355-3 3-3h1V3a1.004 1.004 0 011.052-.999.986.986 0 01.646.285c.191.187.302.446.302.714v1zm3 12.063c.549 0 1-.452 1-1V7c0-.549-.451-1-1-1h-1v1c0 .549-.451 1-1 1-.549 0-1-.451-1-1V6H8.937v1c0 .549-.45 1-1 1-.548 0-1-.451-1-1V6h-1c-.548 0-1 .451-1 1v8.063c.001.112.02.224.057.33.102.287.336.518.624.617.103.035.21.052.32.052z"
			fillRule="nonzero"
		/>
		<path
			d="M18.988 8a3.018 3.018 0 012.016 2.832L21 19c0 1.646-1.354 3-3 3H9.827C8.53 22 7.416 21.16 7 20h11c.549 0 1-.451 1-1z"
			fillRule="nonzero"
		/>
	</svg>
);

export default SvgSeriesOutline;
