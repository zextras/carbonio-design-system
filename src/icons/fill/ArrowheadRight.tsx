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

const SvgArrowheadRight = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="arrowhead-right">
				<path d="M18.78 11.37l-4.78-6a1 1 0 00-1.41-.15 1 1 0 00-.15 1.41L16.71 12l-4.48 5.37a1 1 0 00.13 1.41A1 1 0 0013 19a1 1 0 00.77-.36l5-6a1 1 0 00.01-1.27z" />
				<path d="M7 5.37a1 1 0 00-1.61 1.26L9.71 12l-4.48 5.36a1 1 0 00.13 1.41A1 1 0 006 19a1 1 0 00.77-.36l5-6a1 1 0 000-1.27z" />
			</g>
		</g>
	</svg>
);

export default SvgArrowheadRight;
