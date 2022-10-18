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

const SvgArrowCircleRight = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M2 12A10 10 0 1012 2 10 10 0 002 12zm11.86-3.69l2.86 3a.49.49 0 01.1.15.54.54 0 01.1.16.94.94 0 010 .76 1 1 0 01-.21.33l-3 3a1 1 0 01-1.42-1.42l1.3-1.29H8a1 1 0 010-2h5.66l-1.25-1.31a1 1 0 011.45-1.38z"
				data-name="arrow-circle-right"
			/>
		</g>
	</svg>
);

export default SvgArrowCircleRight;
