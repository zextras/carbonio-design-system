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

const SvgShareOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M18 15a3 3 0 00-2.1.86L8 12.34v-.67l7.9-3.53A3 3 0 1015 6v.34L7.1 9.86a3 3 0 100 4.28l7.9 3.53V18a3 3 0 103-3zm0-10a1 1 0 11-1 1 1 1 0 011-1zM5 13a1 1 0 111-1 1 1 0 01-1 1zm13 6a1 1 0 111-1 1 1 0 01-1 1z"
				data-name="share"
			/>
		</g>
	</svg>
);

export default SvgShareOutline;
