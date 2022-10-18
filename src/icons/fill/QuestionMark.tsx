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

const SvgQuestionMark = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="menu-arrow">
				<path d="M17 9A5 5 0 007 9a1 1 0 002 0 3 3 0 113 3 1 1 0 00-1 1v2a1 1 0 002 0v-1.1A5 5 0 0017 9z" />
				<circle cx={12} cy={19} r={1} />
			</g>
		</g>
	</svg>
);

export default SvgQuestionMark;
