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

const SvgKeypad = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="keypad">
				<path d="M5 2a3 3 0 103 3 3 3 0 00-3-3zM12 2a3 3 0 103 3 3 3 0 00-3-3zM19 8a3 3 0 10-3-3 3 3 0 003 3zM5 9a3 3 0 103 3 3 3 0 00-3-3zM12 9a3 3 0 103 3 3 3 0 00-3-3zM19 9a3 3 0 103 3 3 3 0 00-3-3zM5 16a3 3 0 103 3 3 3 0 00-3-3zM12 16a3 3 0 103 3 3 3 0 00-3-3zM19 16a3 3 0 103 3 3 3 0 00-3-3z" />
			</g>
		</g>
	</svg>
);

export default SvgKeypad;
