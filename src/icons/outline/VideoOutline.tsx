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

const SvgVideoOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M21 7.15a1.7 1.7 0 00-1.85.3l-2.15 2V8a3 3 0 00-3-3H5a3 3 0 00-3 3v8a3 3 0 003 3h9a3 3 0 003-3v-1.45l2.16 2a1.74 1.74 0 001.16.45 1.68 1.68 0 00.69-.15 1.6 1.6 0 001-1.48V8.63A1.6 1.6 0 0021 7.15zM15 16a1 1 0 01-1 1H5a1 1 0 01-1-1V8a1 1 0 011-1h9a1 1 0 011 1zm5-1.4L17.19 12 20 9.4z"
				data-name="video"
			/>
		</g>
	</svg>
);

export default SvgVideoOutline;