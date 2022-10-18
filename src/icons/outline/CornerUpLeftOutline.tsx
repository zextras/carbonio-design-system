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

const SvgCornerUpLeftOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M16 10H7.08l2.7-3.38a1 1 0 10-1.56-1.24l-4 5a1 1 0 000 1.24l4 5A1 1 0 009 17a1 1 0 00.62-.22 1 1 0 00.16-1.4L7.08 12H16a1 1 0 011 1v5a1 1 0 002 0v-5a3 3 0 00-3-3z"
				data-name="corner-up-left"
			/>
		</g>
	</svg>
);

export default SvgCornerUpLeftOutline;
