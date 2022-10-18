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

const SvgTv = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M18 6h-3.59l2.3-2.29a1 1 0 10-1.42-1.42L12 5.59l-3.29-3.3a1 1 0 10-1.42 1.42L9.59 6H6a3 3 0 00-3 3v10a3 3 0 003 3h12a3 3 0 003-3V9a3 3 0 00-3-3zm1 13a1 1 0 01-1 1H6a1 1 0 01-1-1v-7a1 1 0 011-1h12a1 1 0 011 1z"
				data-name="tv"
			/>
		</g>
	</svg>
);

export default SvgTv;