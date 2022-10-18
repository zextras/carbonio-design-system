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

const SvgMenuOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="menu">
				<rect x={3} y={11} width={18} height={2} rx={0.95} ry={0.95} />
				<rect x={3} y={16} width={18} height={2} rx={0.95} ry={0.95} />
				<rect x={3} y={6} width={18} height={2} rx={0.95} ry={0.95} />
			</g>
		</g>
	</svg>
);

export default SvgMenuOutline;