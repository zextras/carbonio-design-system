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

const SvgStarOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18zM12 16.1a.92.92 0 01.46.11l3.77 2-.72-4.21a1 1 0 01.29-.89l3-2.93-4.2-.62a1 1 0 01-.71-.56L12 5.25 10.11 9a1 1 0 01-.75.54l-4.2.62 3 2.93a1 1 0 01.29.89l-.72 4.16 3.77-2a.92.92 0 01.5-.04z"
				data-name="star"
			/>
		</g>
	</svg>
);

export default SvgStarOutline;
