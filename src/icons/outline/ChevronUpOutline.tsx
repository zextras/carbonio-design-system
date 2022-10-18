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

const SvgChevronUpOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M16 14.5a1 1 0 01-.71-.29L12 10.9l-3.3 3.18a1 1 0 01-1.41 0 1 1 0 010-1.42l4-3.86a1 1 0 011.4 0l4 4a1 1 0 010 1.42 1 1 0 01-.69.28z"
				data-name="chevron-up"
			/>
		</g>
	</svg>
);

export default SvgChevronUpOutline;