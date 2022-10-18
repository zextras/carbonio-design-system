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

const SvgCornerLeftDown = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M18 5h-5a3 3 0 00-3 3v8.92l-3.38-2.7a1 1 0 00-1.24 1.56l5 4a1 1 0 001.24 0l5-4a1 1 0 10-1.24-1.56L12 16.92V8a1 1 0 011-1h5a1 1 0 000-2z"
				data-name="corner-left-down"
			/>
		</g>
	</svg>
);

export default SvgCornerLeftDown;
