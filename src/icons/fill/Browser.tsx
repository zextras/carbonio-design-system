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

const SvgBrowser = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M18 3H6a3 3 0 00-3 3v12a3 3 0 003 3h12a3 3 0 003-3V6a3 3 0 00-3-3zm-6 3a1 1 0 11-1 1 1 1 0 011-1zM8 6a1 1 0 11-1 1 1 1 0 011-1zm11 12a1 1 0 01-1 1H6a1 1 0 01-1-1v-7h14z"
				data-name="browser"
			/>
		</g>
	</svg>
);

export default SvgBrowser;
