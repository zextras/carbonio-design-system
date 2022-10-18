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

const SvgThermometerMinusOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="thermometer-minus">
				<rect x={2} y={5} width={6} height={2} rx={1} ry={1} />
				<path d="M14 22a5 5 0 01-3-9V5a3 3 0 013-3 3 3 0 013 3v8a5 5 0 01-3 9zm0-18a1 1 0 00-1 1v8.54a1 1 0 01-.5.87A3 3 0 0011 17a3 3 0 006 0 3 3 0 00-1.5-2.59 1 1 0 01-.5-.87V5a.93.93 0 00-.29-.69A1 1 0 0014 4z" />
			</g>
		</g>
	</svg>
);

export default SvgThermometerMinusOutline;
