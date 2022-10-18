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

const SvgScissors = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="scissors">
				<path d="M20.21 5.71a1 1 0 10-1.42-1.42l-6.28 6.31-3.3-3.31A3 3 0 009.5 6a3 3 0 10-3 3 3 3 0 001.29-.3L11.1 12l-3.29 3.3A3 3 0 006.5 15a3 3 0 103 3 3 3 0 00-.29-1.26zM6.5 7a1 1 0 111-1 1 1 0 01-1 1zm0 12a1 1 0 111-1 1 1 0 01-1 1z" />
				<path d="M15.21 13.29a1 1 0 00-1.42 1.42l5 5a1 1 0 001.42 0 1 1 0 000-1.42z" />
			</g>
		</g>
	</svg>
);

export default SvgScissors;
