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

const SvgGoogle = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M17.5 14a5.51 5.51 0 01-4.5 3.93 6.15 6.15 0 01-7-5.45A6 6 0 0112 6a6.12 6.12 0 012.27.44.5.5 0 00.64-.21l1.44-2.65a.52.52 0 00-.23-.7A10 10 0 002 12.29 10.12 10.12 0 0011.57 22 10 10 0 0022 12.52v-2a.51.51 0 00-.5-.5h-9a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h5"
				data-name="google"
			/>
		</g>
	</svg>
);

export default SvgGoogle;
