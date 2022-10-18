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

const SvgArrowUpOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M16.21 16H7.79a1.76 1.76 0 01-1.59-1 2.1 2.1 0 01.26-2.21l4.21-5.1a1.76 1.76 0 012.66 0l4.21 5.1A2.1 2.1 0 0117.8 15a1.76 1.76 0 01-1.59 1zM8 14h7.9L12 9.18z"
				data-name="arrow-up"
			/>
		</g>
	</svg>
);

export default SvgArrowUpOutline;
