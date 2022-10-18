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

const SvgArrowDownward = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M18.77 13.36a1 1 0 00-1.41-.13L13 16.86V5a1 1 0 00-2 0v11.86l-4.36-3.63a1 1 0 10-1.28 1.54l6 5 .15.09.13.07a1 1 0 00.72 0l.13-.07.15-.09 6-5a1 1 0 00.13-1.41z"
				data-name="arrow-down"
			/>
		</g>
	</svg>
);

export default SvgArrowDownward;
