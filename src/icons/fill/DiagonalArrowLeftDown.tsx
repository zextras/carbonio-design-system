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

const SvgDiagonalArrowLeftDown = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M17.71 6.29a1 1 0 00-1.42 0L8 14.59V9a1 1 0 00-2 0v8a1 1 0 001 1h8a1 1 0 000-2H9.41l8.3-8.29a1 1 0 000-1.42z"
				data-name="diagonal-arrow-left-down"
			/>
		</g>
	</svg>
);

export default SvgDiagonalArrowLeftDown;
