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

const SvgNavigation = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M20 20a.94.94 0 01-.55-.17l-6.9-4.56a1 1 0 00-1.1 0l-6.9 4.56a1 1 0 01-1.44-1.28l8-16a1 1 0 011.78 0l8 16a1 1 0 01-.23 1.2A1 1 0 0120 20z"
				data-name="navigation"
			/>
		</g>
	</svg>
);

export default SvgNavigation;
