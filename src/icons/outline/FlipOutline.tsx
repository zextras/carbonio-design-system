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

const SvgFlipOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="flip-in">
				<path d="M5 6.09v12l-1.29-1.3a1 1 0 00-1.42 1.42l3 3a1 1 0 001.42 0l3-3a1 1 0 000-1.42 1 1 0 00-1.42 0L7 18.09v-12A1.56 1.56 0 018.53 4.5H11a1 1 0 000-2H8.53A3.56 3.56 0 005 6.09zM14.29 5.79a1 1 0 001.42 1.42L17 5.91v12a1.56 1.56 0 01-1.53 1.59H13a1 1 0 000 2h2.47A3.56 3.56 0 0019 17.91v-12l1.29 1.3a1 1 0 001.42 0 1 1 0 000-1.42l-3-3a1 1 0 00-1.42 0z" />
			</g>
		</g>
	</svg>
);

export default SvgFlipOutline;