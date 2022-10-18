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

const SvgArchiveOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="archive">
				<path d="M21 6a3 3 0 00-3-3H6a3 3 0 00-2 5.22V18a3 3 0 003 3h10a3 3 0 003-3V8.22A3 3 0 0021 6zM6 5h12a1 1 0 010 2H6a1 1 0 010-2zm12 13a1 1 0 01-1 1H7a1 1 0 01-1-1V9h12z" />
				<rect x={9} y={12} width={6} height={2} rx={0.87} ry={0.87} />
			</g>
		</g>
	</svg>
);

export default SvgArchiveOutline;
