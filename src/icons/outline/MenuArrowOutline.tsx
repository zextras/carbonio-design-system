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

const SvgMenuArrowOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="menu-arrow">
				<path d="M20.05 11H5.91l1.3-1.29a1 1 0 00-1.42-1.42l-3 3a1 1 0 000 1.42l3 3a1 1 0 001.42 0 1 1 0 000-1.42L5.91 13h14.14a1 1 0 00.95-.95V12a1 1 0 00-.95-1z" />
				<rect x={3} y={17} width={18} height={2} rx={0.95} ry={0.95} />
				<rect x={3} y={5} width={18} height={2} rx={0.95} ry={0.95} />
			</g>
		</g>
	</svg>
);

export default SvgMenuArrowOutline;
