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

const SvgUnlock = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="unlock">
				<circle cx={12} cy={15} r={1} />
				<path d="M17 8h-7V6a2 2 0 014 0 1 1 0 002 0 4 4 0 00-8 0v2H7a3 3 0 00-3 3v8a3 3 0 003 3h10a3 3 0 003-3v-8a3 3 0 00-3-3zm-5 10a3 3 0 113-3 3 3 0 01-3 3z" />
			</g>
		</g>
	</svg>
);

export default SvgUnlock;
