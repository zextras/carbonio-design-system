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

const SvgFlake = (props: SVGProps<SVGSVGElement>): JSX.Element => (
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
		<path d="M0 0h24v24H0z" />
		<path d="M9.647 3.218c.45-.658 1.35-1.155 2.353-1.155 1.003 0 1.903.497 2.353 1.155.719-.345 1.747-.326 2.616.176s1.4 1.382 1.46 2.177c.795.06 1.675.592 2.177 1.46.502.869.521 1.897.176 2.616.658.45 1.156 1.35 1.156 2.353 0 1.003-.498 1.903-1.156 2.353.345.719.326 1.747-.176 2.616s-1.382 1.4-2.177 1.46c-.06.795-.591 1.675-1.46 2.177s-1.897.521-2.616.176c-.45.658-1.35 1.156-2.353 1.156-1.003 0-1.903-.498-2.353-1.156-.719.345-1.747.326-2.616-.176-.868-.502-1.4-1.382-1.46-2.177-.795-.06-1.675-.591-2.177-1.46s-.521-1.897-.176-2.616c-.658-.45-1.155-1.35-1.155-2.353 0-1.003.497-1.903 1.155-2.353-.345-.719-.326-1.747.176-2.616.502-.868 1.382-1.4 2.177-1.46.06-.795.592-1.675 1.46-2.177.869-.502 1.897-.521 2.616-.176z" />
	</svg>
);

export default SvgFlake;
