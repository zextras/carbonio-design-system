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

const SvgMonitorOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M19 3H5a3 3 0 00-3 3v8a3 3 0 003 3h6v2H7a1 1 0 000 2h10a1 1 0 000-2h-4v-2h6a3 3 0 003-3V6a3 3 0 00-3-3zm1 11a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h14a1 1 0 011 1z"
				data-name="monitor"
			/>
		</g>
	</svg>
);

export default SvgMonitorOutline;