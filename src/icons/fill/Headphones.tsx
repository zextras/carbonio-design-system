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

const SvgHeadphones = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M12 2A10.2 10.2 0 002 12.37V17a4 4 0 104-4 3.91 3.91 0 00-2 .56v-1.19A8.2 8.2 0 0112 4a8.2 8.2 0 018 8.37v1.19a3.91 3.91 0 00-2-.56 4 4 0 104 4v-4.63A10.2 10.2 0 0012 2z"
				data-name="headphones"
			/>
		</g>
	</svg>
);

export default SvgHeadphones;
