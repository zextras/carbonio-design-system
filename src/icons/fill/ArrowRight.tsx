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

const SvgArrowRight = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M10.46 18a2.23 2.23 0 01-.91-.2 1.76 1.76 0 01-1.05-1.59V7.79A1.76 1.76 0 019.55 6.2a2.1 2.1 0 012.21.26l5.1 4.21a1.7 1.7 0 010 2.66l-5.1 4.21a2.06 2.06 0 01-1.3.46z"
				data-name="arrow-right"
			/>
		</g>
	</svg>
);

export default SvgArrowRight;