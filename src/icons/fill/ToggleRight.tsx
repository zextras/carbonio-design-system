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

const SvgToggleRight = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="toggle-right">
				<circle cx={15} cy={12} r={1} />
				<path d="M15 5H9a7 7 0 000 14h6a7 7 0 000-14zm0 10a3 3 0 113-3 3 3 0 01-3 3z" />
			</g>
		</g>
	</svg>
);

export default SvgToggleRight;
