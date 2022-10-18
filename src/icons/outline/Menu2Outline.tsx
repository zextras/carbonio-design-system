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

const SvgMenu2Outline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="menu-2">
				<circle cx={4} cy={12} r={1} />
				<rect x={7} y={11} width={14} height={2} rx={0.94} ry={0.94} />
				<rect x={3} y={16} width={18} height={2} rx={0.94} ry={0.94} />
				<rect x={3} y={6} width={18} height={2} rx={0.94} ry={0.94} />
			</g>
		</g>
	</svg>
);

export default SvgMenu2Outline;