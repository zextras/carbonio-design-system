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

const SvgLinkedin = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="linkedin">
				<path d="M15.15 8.4a5.83 5.83 0 00-5.85 5.82v5.88a.9.9 0 00.9.9h2.1a.9.9 0 00.9-.9v-5.88a1.94 1.94 0 012.15-1.93 2 2 0 011.75 2v5.81a.9.9 0 00.9.9h2.1a.9.9 0 00.9-.9v-5.88a5.83 5.83 0 00-5.85-5.82z" />
				<rect x={3} y={9.3} width={4.5} height={11.7} rx={0.9} ry={0.9} />
				<circle cx={5.25} cy={5.25} r={2.25} />
			</g>
		</g>
	</svg>
);

export default SvgLinkedin;
