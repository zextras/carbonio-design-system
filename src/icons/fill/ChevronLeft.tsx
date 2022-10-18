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

const SvgChevronLeft = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M13.36 17a1 1 0 01-.72-.31l-3.86-4a1 1 0 010-1.4l4-4a1 1 0 111.42 1.42L10.9 12l3.18 3.3a1 1 0 010 1.41 1 1 0 01-.72.29z"
				data-name="chevron-left"
			/>
		</g>
	</svg>
);

export default SvgChevronLeft;
