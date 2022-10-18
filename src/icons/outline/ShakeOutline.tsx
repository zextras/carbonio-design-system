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

const SvgShakeOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="shake">
				<path d="M5.5 18a1 1 0 01-.64-.24A8.81 8.81 0 011.5 11a8.81 8.81 0 013.36-6.76 1 1 0 111.28 1.52A6.9 6.9 0 003.5 11a6.9 6.9 0 002.64 5.24 1 1 0 01.13 1.4 1 1 0 01-.77.36zM12 7a4.09 4.09 0 011 .14V3a1 1 0 00-2 0v4.14A4.09 4.09 0 0112 7zM12 15a4.09 4.09 0 01-1-.14V20a1 1 0 002 0v-5.14a4.09 4.09 0 01-1 .14zM16 16a1 1 0 01-.77-.36 1 1 0 01.13-1.4A4.28 4.28 0 0017 11a4.28 4.28 0 00-1.64-3.24 1 1 0 111.28-1.52A6.2 6.2 0 0119 11a6.2 6.2 0 01-2.36 4.76A1 1 0 0116 16z" />
				<path d="M8 16a1 1 0 01-.64-.24A6.2 6.2 0 015 11a6.2 6.2 0 012.36-4.76 1 1 0 111.28 1.52A4.28 4.28 0 007 11a4.28 4.28 0 001.64 3.24 1 1 0 01.13 1.4A1 1 0 018 16zM18.5 18a1 1 0 01-.77-.36 1 1 0 01.13-1.4A6.9 6.9 0 0020.5 11a6.9 6.9 0 00-2.64-5.24 1 1 0 111.28-1.52A8.81 8.81 0 0122.5 11a8.81 8.81 0 01-3.36 6.76 1 1 0 01-.64.24zM12 12a1 1 0 111-1 1 1 0 01-1 1zm0-1zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0z" />
			</g>
		</g>
	</svg>
);

export default SvgShakeOutline;
